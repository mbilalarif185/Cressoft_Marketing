// One-shot migration: every raster image in `public/` → WebP.
//
//   * In-use raster images (.png/.jpg/.jpeg/.gif) are converted to .webp,
//     every textual reference under src/, content/, public/icons/, and
//     root config files is rewritten to the new .webp path, and the
//     original raster file is deleted.
//   * Raster images that are not referenced anywhere are deleted outright.
//   * .ico, .svg, and existing .webp files are left untouched.
//
// run with: `node scripts/migrate-to-webp.mjs`
//
// The script is destructive on purpose — commit before running so you can
// review the diff and `git restore` if anything looks off.

import { promises as fs } from "node:fs";
import { resolve, relative, join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");
const IMAGES_DIR = join(PUBLIC_DIR, "images");

const RASTER_EXT = new Set([".png", ".jpg", ".jpeg", ".gif"]);
const SOURCE_EXT = /\.(tsx?|jsx?|mjs|cjs|scss|sass|css|mdx?|html?|json)$/i;
const SOURCE_DIRS = ["src", "content"];
const EXTRA_FILE_GLOB_DIRS = [join(PUBLIC_DIR, "icons")];
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", ".turbo", "out"]);

/** Recursively collect files matching `predicate(name, fullPath)`. */
async function collect(dir, predicate, out = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) await collect(p, predicate, out);
    else if (predicate(e.name, p)) out.push(p);
  }
  return out;
}

async function collectImages() {
  return collect(PUBLIC_DIR, (name) =>
    RASTER_EXT.has(extname(name).toLowerCase())
  );
}

async function collectSourceFiles() {
  const out = [];
  for (const dir of SOURCE_DIRS) {
    await collect(join(ROOT, dir), (name) => SOURCE_EXT.test(name), out);
  }
  for (const dir of EXTRA_FILE_GLOB_DIRS) {
    await collect(dir, (name) => /\.(css|scss|html?)$/i.test(name), out);
  }
  // Top-level config files (next.config.*, etc.)
  for (const e of await fs.readdir(ROOT, { withFileTypes: true })) {
    if (!e.isFile()) continue;
    if (/\.(m?[jt]s|cjs|json)$/i.test(e.name)) {
      out.push(join(ROOT, e.name));
    }
  }
  return out;
}

/** Build needles for a public-relative path; e.g. `images/foo/bar.png` →
 *  matches `images/foo/bar.png`, `/images/foo/bar.png`, `public/images/foo/bar.png`. */
function buildNeedles(publicRel) {
  return [publicRel, "/" + publicRel, "public/" + publicRel];
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fmt(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function main() {
  const startedAt = Date.now();
  const allImages = await collectImages();
  allImages.sort();

  const sourceFiles = await collectSourceFiles();
  // Pre-load every source file into memory once. Faster + lets us batch
  // rewrites across all images before flushing to disk.
  const fileBuf = new Map();
  for (const f of sourceFiles) {
    fileBuf.set(f, await fs.readFile(f, "utf8"));
  }

  /** Find every source file that references the given public-relative path. */
  function findReferences(publicRel) {
    const needles = buildNeedles(publicRel);
    const hits = [];
    for (const [file, txt] of fileBuf) {
      if (needles.some((n) => txt.includes(n))) hits.push(file);
    }
    return hits;
  }

  const report = {
    converted: [],
    deletedUnused: [],
    skippedFavicon: [],
    rewrittenFiles: new Set(),
    rewriteCount: 0,
    bytesBefore: 0,
    bytesAfterWebp: 0,
    bytesDeleted: 0,
  };

  for (const imgPath of allImages) {
    const publicRel = relative(PUBLIC_DIR, imgPath).replace(/\\/g, "/");
    const buf = await fs.readFile(imgPath);
    report.bytesBefore += buf.length;

    // Safety: never touch favicon assets even if they happen to be png.
    if (/(^|\/)favicon\./i.test(publicRel)) {
      report.skippedFavicon.push(publicRel);
      continue;
    }

    const refs = findReferences(publicRel);

    if (refs.length === 0) {
      // Unused → delete outright.
      await fs.unlink(imgPath);
      report.deletedUnused.push(publicRel);
      report.bytesDeleted += buf.length;
      continue;
    }

    // Convert to WebP. Quality 82 + effort 6 is a good photographic sweet
    // spot; smartSubsample keeps text/edges crisp for UI screenshots.
    const webpBuf = await sharp(buf, { failOn: "none" })
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toBuffer();

    const webpRel = publicRel.replace(/\.(png|jpe?g|gif)$/i, ".webp");
    const webpPath = join(PUBLIC_DIR, webpRel);

    await fs.writeFile(webpPath, webpBuf);
    if (webpPath !== imgPath) await fs.unlink(imgPath);
    report.bytesAfterWebp += webpBuf.length;
    report.converted.push({
      from: publicRel,
      to: webpRel,
      before: buf.length,
      after: webpBuf.length,
    });

    // Rewrite every textual reference. We replace each needle variant in
    // turn so we keep the original prefix style (`/images/...` stays
    // absolute, `images/...` stays bare, etc.).
    const oldNeedles = buildNeedles(publicRel);
    const newNeedles = buildNeedles(webpRel);
    for (const file of refs) {
      let txt = fileBuf.get(file);
      let changed = false;
      for (let i = 0; i < oldNeedles.length; i++) {
        const re = new RegExp(escapeRe(oldNeedles[i]), "g");
        const matches = txt.match(re);
        if (!matches) continue;
        txt = txt.replace(re, newNeedles[i]);
        changed = true;
        report.rewriteCount += matches.length;
      }
      if (changed) {
        fileBuf.set(file, txt);
        report.rewrittenFiles.add(file);
      }
    }
  }

  // Flush all source-file rewrites to disk.
  for (const file of report.rewrittenFiles) {
    await fs.writeFile(file, fileBuf.get(file));
  }

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`\n--- WebP migration report (${elapsed}s) ---`);
  console.log(`raster images scanned     : ${allImages.length}`);
  console.log(`converted to webp         : ${report.converted.length}`);
  console.log(`deleted (unused)          : ${report.deletedUnused.length}`);
  console.log(`favicon files skipped     : ${report.skippedFavicon.length}`);
  console.log(`source files rewritten    : ${report.rewrittenFiles.size}`);
  console.log(`reference rewrites        : ${report.rewriteCount}`);
  console.log(`bytes before              : ${fmt(report.bytesBefore)}`);
  console.log(`bytes (webp output)       : ${fmt(report.bytesAfterWebp)}`);
  console.log(`bytes freed (unused)      : ${fmt(report.bytesDeleted)}`);
  const totalAfter = report.bytesAfterWebp;
  const saved = report.bytesBefore - totalAfter - report.bytesDeleted;
  console.log(
    `total compression saving  : ${fmt(saved)} (${(
      (saved / Math.max(report.bytesBefore, 1)) *
      100
    ).toFixed(1)}% on converted set)`
  );

  if (report.deletedUnused.length) {
    await fs.writeFile(
      join(ROOT, "scripts", "deleted-unused-images.txt"),
      report.deletedUnused.join("\n") + "\n"
    );
    console.log(`wrote scripts/deleted-unused-images.txt`);
  }
  if (report.converted.length) {
    await fs.writeFile(
      join(ROOT, "scripts", "renamed-to-webp.txt"),
      report.converted.map((c) => `${c.from} -> ${c.to}`).join("\n") + "\n"
    );
    console.log(`wrote scripts/renamed-to-webp.txt`);
  }
  // IMAGES_DIR is read implicitly via collectImages(); reference it here so
  // the constant doesn't show up as unused if the script is later edited.
  void IMAGES_DIR;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
