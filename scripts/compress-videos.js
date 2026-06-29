/**
 * scripts/compress-videos.js
 * ---------------------------------------------------------------------------
 * Compresses the oversized hero videos in /public using fluent-ffmpeg.
 *
 * FFmpeg was NOT available in the build/agent environment, so this is provided
 * for a developer to run locally.
 *
 *   Prerequisites:
 *     1. Install FFmpeg (the actual binary) and make sure it is on your PATH:
 *          macOS:    brew install ffmpeg
 *          Windows:  winget install Gyan.FFmpeg   (or: choco install ffmpeg)
 *          Linux:    sudo apt-get install ffmpeg
 *     2. Install the JS wrapper:
 *          npm install fluent-ffmpeg
 *
 *   Usage:
 *     node scripts/compress-videos.js
 *
 * Settings mirror the agreed encode: H.264, CRF 28, preset slow, scaled to
 * 1280px wide (height auto, even), audio stripped (-an), faststart for instant
 * web playback. Output is written next to the source as *-compressed.mp4 so the
 * original is never destroyed — verify the result, then swap the reference in
 * src/components/HeroSection.jsx (VIDEO_SRC) to the compressed file.
 *
 * Targets after encode:  london.mp4 < 2 MB   |   london-aerial-720.mp4 < 3 MB
 * ---------------------------------------------------------------------------
 */
const fs = require("fs");
const path = require("path");

let ffmpeg;
try {
  ffmpeg = require("fluent-ffmpeg");
} catch {
  console.error(
    "fluent-ffmpeg is not installed. Run:  npm install fluent-ffmpeg\n" +
      "You also need the FFmpeg binary on your PATH (see header comment)."
  );
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

const JOBS = [
  { in: "public/london.mp4", out: "public/london-compressed.mp4" },
  {
    in: "public/videos/london-aerial-720.mp4",
    out: "public/videos/london-aerial-720-compressed.mp4",
  },
];

function encode(job) {
  return new Promise((resolve, reject) => {
    const inPath = path.join(root, job.in);
    const outPath = path.join(root, job.out);

    if (!fs.existsSync(inPath)) {
      console.log(`SKIP  ${job.in} — not found`);
      return resolve();
    }
    const before = fs.statSync(inPath).size;
    console.log(`\nEncoding ${job.in}  (${mb(before)})...`);

    ffmpeg(inPath)
      .videoCodec("libx264")
      .outputOptions([
        "-crf 28",
        "-preset slow",
        "-vf scale=1280:-2",
        "-an",
        "-movflags +faststart",
      ])
      .on("end", () => {
        const after = fs.statSync(outPath).size;
        const saved = (((before - after) / before) * 100).toFixed(1);
        console.log(`DONE  ${job.out}: ${mb(before)} -> ${mb(after)}  (-${saved}%)`);
        resolve();
      })
      .on("error", reject)
      .save(outPath);
  });
}

(async () => {
  for (const job of JOBS) {
    // eslint-disable-next-line no-await-in-loop
    await encode(job);
  }
  console.log(
    "\nAll done. Verify playback, then point VIDEO_SRC in " +
      "src/components/HeroSection.jsx at /london-compressed.mp4 (and delete the originals)."
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
