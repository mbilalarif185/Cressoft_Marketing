/**
 * scripts/faststart-video.js
 * ---------------------------------------------------------------------------
 * Lossless "faststart" re-mux for an MP4 — moves the `moov` atom to the front
 * so browsers can begin playback after the first bytes instead of downloading
 * the whole file. No re-encoding, no quality change, identical byte count.
 *
 * This is the standard qt-faststart transform: relocate `moov` to just after
 * `ftyp`, then add the size of the relocated `moov` to every chunk-offset
 * entry (stco / co64) inside it, because all media data (mdat) shifts forward
 * by exactly that many bytes.
 *
 *   Usage:  node scripts/faststart-video.js public/london.mp4 [output.mp4]
 *
 * Writes <name>-faststart.mp4 next to the source by default and NEVER
 * overwrites the original. Verify playback, then replace the original.
 * ---------------------------------------------------------------------------
 */
const fs = require("fs");
const path = require("path");

const CONTAINERS = new Set([
  "moov", "trak", "mdia", "minf", "stbl", "edts", "udta", "mvex", "moof", "traf",
]);

function readAtoms(buf, start, end) {
  const atoms = [];
  let pos = start;
  while (pos + 8 <= end) {
    let size = buf.readUInt32BE(pos);
    const type = buf.toString("latin1", pos + 4, pos + 8);
    let headerSize = 8;
    if (size === 1) {
      // 64-bit extended size
      size = Number(buf.readBigUInt64BE(pos + 8));
      headerSize = 16;
    } else if (size === 0) {
      size = end - pos; // extends to end
    }
    if (size < headerSize || pos + size > end) break;
    atoms.push({ type, start: pos, size, headerSize });
    pos += size;
  }
  return atoms;
}

/** Recursively add `shift` to every stco/co64 offset inside [start,end). */
function patchOffsets(buf, start, end, shift) {
  for (const a of readAtoms(buf, start, end)) {
    if (a.type === "stco") {
      const tableStart = a.start + a.headerSize + 4; // skip version/flags
      const count = buf.readUInt32BE(tableStart);
      let p = tableStart + 4;
      for (let i = 0; i < count; i++, p += 4) {
        buf.writeUInt32BE((buf.readUInt32BE(p) + shift) >>> 0, p);
      }
    } else if (a.type === "co64") {
      const tableStart = a.start + a.headerSize + 4;
      const count = buf.readUInt32BE(tableStart);
      let p = tableStart + 4;
      for (let i = 0; i < count; i++, p += 8) {
        buf.writeBigUInt64BE(buf.readBigUInt64BE(p) + BigInt(shift), p);
      }
    } else if (CONTAINERS.has(a.type)) {
      patchOffsets(buf, a.start + a.headerSize, a.start + a.size, shift);
    }
  }
}

function main() {
  const input = process.argv[2] || "public/london.mp4";
  const root = path.resolve(__dirname, "..");
  const inPath = path.isAbsolute(input) ? input : path.join(root, input);
  const outPath =
    process.argv[3] ||
    inPath.replace(/\.mp4$/i, "") + "-faststart.mp4";

  const buf = fs.readFileSync(inPath);
  const top = readAtoms(buf, 0, buf.length);
  const moov = top.find((a) => a.type === "moov");
  const ftyp = top.find((a) => a.type === "ftyp");
  if (!moov) throw new Error("No moov atom found — not a valid MP4?");

  const mdat = top.find((a) => a.type === "mdat");
  if (moov.start < (mdat ? mdat.start : Infinity)) {
    console.log("Already faststart (moov precedes mdat). Nothing to do.");
    return;
  }

  // Relocate moov to just after ftyp, patching its offset tables by +moov.size.
  const moovBuf = Buffer.from(buf.subarray(moov.start, moov.start + moov.size));
  patchOffsets(moovBuf, moov.headerSize, moovBuf.length, moov.size);

  const head = ftyp ? buf.subarray(0, ftyp.start + ftyp.size) : Buffer.alloc(0);
  // everything else, original order, minus ftyp and the (old) moov
  const rest = [];
  for (const a of top) {
    if (a === moov || a === ftyp) continue;
    rest.push(buf.subarray(a.start, a.start + a.size));
  }

  const out = Buffer.concat([head, moovBuf, ...rest]);
  fs.writeFileSync(outPath, out);

  // ---- structural verification ----
  const v = readAtoms(out, 0, out.length);
  const vMoov = v.find((a) => a.type === "moov");
  const vMdat = v.find((a) => a.type === "mdat");
  const ok =
    out.length === buf.length &&
    vMoov && vMdat && vMoov.start < vMdat.start;

  console.log(`in : ${inPath}`);
  console.log(`out: ${outPath}`);
  console.log(`size: ${(buf.length / 1024 / 1024).toFixed(2)} MB (unchanged: ${out.length === buf.length})`);
  console.log(`moov now at byte ${vMoov.start} (${((vMoov.start / out.length) * 100).toFixed(2)}%), mdat at ${vMdat.start}`);
  console.log(ok ? "VERIFIED: faststart layout, byte count preserved." : "WARNING: verification failed — do NOT use this output.");
  if (!ok) process.exit(1);
}

main();
