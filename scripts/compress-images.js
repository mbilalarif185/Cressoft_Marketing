/**
 * scripts/compress-images.js
 * ---------------------------------------------------------------------------
 * Recompresses a handful of oversized WebP assets in /public/images in place,
 * using the `sharp` package (already a project dependency).
 *
 *   Usage:  node scripts/compress-images.js
 *
 * Each image is re-encoded as WebP at quality 75 with max effort. The file is
 * only overwritten when the re-encode is actually smaller, so re-running the
 * script is idempotent and never inflates an already-optimised asset.
 *
 * Originals are read fully into memory before writing, so reading and writing
 * the same path is safe.
 * ---------------------------------------------------------------------------
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const QUALITY = 75;

const TARGETS = [
  "public/images/blog2.webp",
  "public/images/cta.webp",
  "public/images/quantel-solutions.webp",
  "public/images/about-us.webp",
];

const root = path.resolve(__dirname, "..");
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const rel of TARGETS) {
    const file = path.join(root, rel);
    if (!fs.existsSync(file)) {
      console.log(`SKIP  ${rel} — file not found`);
      continue;
    }

    const input = fs.readFileSync(file);
    const before = input.length;

    const output = await sharp(input)
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();

    const after = output.length;
    totalBefore += before;

    if (after < before) {
      fs.writeFileSync(file, output);
      totalAfter += after;
      const saved = (((before - after) / before) * 100).toFixed(1);
      console.log(`OK    ${rel}: ${kb(before)} -> ${kb(after)}  (-${saved}%)`);
    } else {
      totalAfter += before;
      console.log(
        `KEEP  ${rel}: ${kb(before)} (re-encode ${kb(after)} was not smaller)`
      );
    }
  }

  console.log("---");
  console.log(
    `TOTAL: ${kb(totalBefore)} -> ${kb(totalAfter)}  (-${(
      ((totalBefore - totalAfter) / totalBefore) *
      100
    ).toFixed(1)}%)`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
