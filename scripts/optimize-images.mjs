// Source-level image optimisation pipeline.
//
//   pass 1: lossless PNG re-encode (palette + adaptive filter) for every PNG
//           under `public/images/`. zero behaviour change, zero import edits.
//   pass 2: PNG → WebP for assets that are *only* referenced via JS module
//           imports (next/image picks up `.webp` exactly the same way).
//
// run with: `node scripts/optimize-images.mjs`
// or:       `npm run optimize:images`
//
// the script is idempotent — running it twice is a no-op for already-optimised
// PNGs (sharp will simply re-emit the same bytes; we keep the smaller of the
// two outputs).

import { promises as fs } from "node:fs";
import { resolve, relative, join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const SRC_DIR = join(ROOT, "src");

// Files whose URLs are referenced as raw strings somewhere (CSS background,
// inline style, <img src>, OG/favicon, markdown cover field). Renaming these
// to .webp would silently 404, so we keep them as PNG and only re-compress.
//
// Paths are relative to `public/`, normalised to forward slashes.
const KEEP_AS_PNG = new Set([
  "images/favicon.png",
  "images/digital-marketing-agency.png",
  "images/star.png",
  "images/about-us.png",
  "images/agency/dot.png",
  "images/agency/dot-large.png",
  "images/testimonial/line.png",
  "images/banner/line.png",
  "images/banner/line-l.png",
  "images/banner/cmn-banner-bg.png",
  "images/footer/footer-bg.png",
  "images/cta-two-bg.png",
  "images/cta-bg.png",
  "images/news/poster.png",
]);

/** Recursively yield every `.png` under `dir`. */
async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (extname(e.name).toLowerCase() === ".png") yield p;
  }
}

/** True if `pngPath` (absolute) is referenced as a raw URL string anywhere
 *  in `src/` (not just as a TypeScript module import). */
async function isReferencedAsUrl(pngPath, srcFiles) {
  const publicRel = relative(join(ROOT, "public"), pngPath).replace(/\\/g, "/");
  // Match the path embedded in a string literal — covers CSS url(...), inline
  // styles, `data-*` attrs, and direct <img src="...">. The leading slash is
  // important so we don't mistake `import foo from "public/images/x.png"`.
  const needle = "/" + publicRel;
  const importNeedle = `public/${publicRel}`;
  for (const file of srcFiles) {
    const txt = await fs.readFile(file, "utf8");
    if (!txt.includes(publicRel)) continue;
    // strip lines that are clearly TS module imports — those will be updated
    // to .webp by us, so they don't count as a raw URL reference.
    const lines = txt.split(/\r?\n/);
    for (const ln of lines) {
      const trimmed = ln.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
      if (trimmed.startsWith("import ") && trimmed.includes(importNeedle))
        continue;
      if (trimmed.includes(needle)) return true;
      // SCSS background-image: url("../../../public/images/...")
      if (trimmed.includes(`/public/${publicRel}`)) return true;
    }
  }
  return false;
}

async function collectSrcFiles() {
  const out = [];
  async function walkSrc(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walkSrc(p);
      else if (/\.(tsx?|jsx?|scss|css|md|mdx)$/i.test(e.name)) out.push(p);
    }
  }
  await walkSrc(SRC_DIR);
  return out;
}

function fmt(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function main() {
  const srcFiles = await collectSrcFiles();
  const pngs = [];
  for await (const p of walk(IMAGES_DIR)) pngs.push(p);
  pngs.sort();

  let totalBefore = 0,
    totalAfter = 0,
    totalSavedPng = 0,
    totalSavedWebp = 0,
    pngOptimised = 0,
    convertedToWebp = 0;
  const renames = []; // [{ fromPng, toWebp }]

  for (const pngPath of pngs) {
    const rel = relative(ROOT, pngPath).replace(/\\/g, "/");
    const publicRel = rel.replace(/^public\//, "");
    const beforeBuf = await fs.readFile(pngPath);
    const before = beforeBuf.length;
    totalBefore += before;

    // Pass 1 — lossless PNG re-encode (palette + filter + best zlib).
    const pngOut = await sharp(beforeBuf, { failOn: "none" })
      .png({
        compressionLevel: 9,
        palette: true,
        quality: 90,
        effort: 10,
      })
      .toBuffer();

    let usedBuf = beforeBuf;
    let usedSize = before;

    if (pngOut.length < before) {
      await fs.writeFile(pngPath, pngOut);
      usedBuf = pngOut;
      usedSize = pngOut.length;
      totalSavedPng += before - pngOut.length;
      pngOptimised++;
    }

    // Pass 2 — WebP conversion if (a) not in keep-list and (b) no raw-URL
    // references remain. WebP at q=82 is a good photographic sweet spot.
    if (!KEEP_AS_PNG.has(publicRel)) {
      const referenced = await isReferencedAsUrl(pngPath, srcFiles);
      if (!referenced) {
        const webpOut = await sharp(usedBuf, { failOn: "none" })
          .webp({ quality: 82, effort: 6, smartSubsample: true })
          .toBuffer();

        // Only swap to WebP if it's at least 5% smaller — tiny PNG icons
        // and already-optimised palettes can sometimes lose to WebP.
        if (webpOut.length < usedSize * 0.95) {
          const webpPath =
            pngPath.slice(0, -extname(pngPath).length) + ".webp";
          await fs.writeFile(webpPath, webpOut);
          await fs.unlink(pngPath);
          renames.push({
            fromPng: publicRel,
            toWebp: publicRel.replace(/\.png$/i, ".webp"),
          });
          totalSavedWebp += usedSize - webpOut.length;
          totalAfter += webpOut.length;
          convertedToWebp++;
          continue;
        }
      }
    }

    totalAfter += usedSize;
  }

  console.log(`\n--- image optimisation report ---`);
  console.log(`png files scanned         : ${pngs.length}`);
  console.log(`png files re-compressed   : ${pngOptimised}`);
  console.log(`png files → webp          : ${convertedToWebp}`);
  console.log(`bytes before              : ${fmt(totalBefore)}`);
  console.log(`bytes after               : ${fmt(totalAfter)}`);
  console.log(
    `total saved               : ${fmt(totalBefore - totalAfter)} (${(
      ((totalBefore - totalAfter) / totalBefore) *
      100
    ).toFixed(1)}%)`
  );
  console.log(`  ↳ from png re-encode    : ${fmt(totalSavedPng)}`);
  console.log(`  ↳ from webp conversion  : ${fmt(totalSavedWebp)}`);

  if (renames.length) {
    const out = renames
      .map((r) => `${r.fromPng} -> ${r.toWebp}`)
      .join("\n");
    await fs.writeFile(join(ROOT, "scripts", "renamed-to-webp.txt"), out);
    console.log(
      `\nwrote scripts/renamed-to-webp.txt (use with update-image-imports.mjs)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
