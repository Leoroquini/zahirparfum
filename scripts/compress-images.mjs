import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const SIZE_THRESHOLD = 500 * 1024;
const PNG_QUALITY = 80;
const PNG_COMPRESSION = 9;
const MAX_WIDTH = 2400;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function fmt(n) {
  return (n / 1024 / 1024).toFixed(2) + " MB";
}

const all = await walk(PUBLIC_DIR);
const pngs = all.filter((f) => f.toLowerCase().endsWith(".png"));

let before = 0;
let after = 0;
const processed = [];

for (const file of pngs) {
  const statBefore = await fs.stat(file);
  if (statBefore.size < SIZE_THRESHOLD) continue;

  before += statBefore.size;
  const img = sharp(file);
  const meta = await img.metadata();
  let pipeline = img;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  const buf = await pipeline
    .png({ quality: PNG_QUALITY, compressionLevel: PNG_COMPRESSION, palette: true })
    .toBuffer();

  if (buf.length < statBefore.size) {
    await fs.writeFile(file, buf);
    const statAfter = await fs.stat(file);
    after += statAfter.size;
    processed.push({
      file: path.relative(PUBLIC_DIR, file),
      before: statBefore.size,
      after: statAfter.size,
    });
  } else {
    after += statBefore.size;
  }
}

processed.sort((a, b) => b.before - a.before);
console.log("\nImage compression report:\n");
for (const p of processed) {
  const pct = Math.round((1 - p.after / p.before) * 100);
  console.log(
    `  ${p.file.padEnd(45)} ${fmt(p.before).padStart(8)} -> ${fmt(p.after).padStart(8)}  (-${pct}%)`,
  );
}
console.log("\nTotal:");
console.log(
  `  ${fmt(before)} -> ${fmt(after)}  (saved ${fmt(before - after)})\n`,
);
