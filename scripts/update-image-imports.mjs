// Reads `scripts/renamed-to-webp.txt` (produced by optimize-images.mjs) and
// rewrites every `.tsx / .ts / .jsx / .js / .scss / .css` file under `src/`
// that imports / references the old `.png` to point at the new `.webp`.
//
// Idempotent: running twice is a no-op (no `.png` left to rewrite).

import { promises as fs } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC_DIR = join(ROOT, "src");

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(tsx?|jsx?|scss|css|mdx?)$/i.test(e.name)) yield p;
  }
}

async function main() {
  const list = await fs.readFile(
    join(ROOT, "scripts", "renamed-to-webp.txt"),
    "utf8"
  );
  const renames = list
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [from, to] = l.split(" -> ").map((s) => s.trim());
      return { from, to };
    });

  let touchedFiles = 0;
  let totalRewrites = 0;

  for await (const file of walk(SRC_DIR)) {
    let txt = await fs.readFile(file, "utf8");
    let changed = false;
    for (const { from, to } of renames) {
      // Match either bare `images/foo/bar.png` or with leading slash. We need
      // word boundaries around the path so partial matches (e.g. `bar.png`
      // matching `not-bar.png`) don't fire. Using a literal-replace approach.
      const variants = [from, "/" + from, "public/" + from];
      const targets = [to, "/" + to, "public/" + to];
      for (let i = 0; i < variants.length; i++) {
        if (txt.includes(variants[i])) {
          const re = new RegExp(
            variants[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "g"
          );
          const next = txt.replace(re, targets[i]);
          if (next !== txt) {
            const matches = (txt.match(re) || []).length;
            totalRewrites += matches;
            txt = next;
            changed = true;
          }
        }
      }
    }
    if (changed) {
      await fs.writeFile(file, txt);
      touchedFiles++;
    }
  }

  console.log(`updated ${touchedFiles} files (${totalRewrites} replacements)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
