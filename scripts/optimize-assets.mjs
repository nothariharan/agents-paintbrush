/**
 * Compress src/assets PNG → WebP (max 1280px wide).
 * Run: node scripts/optimize-assets.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.resolve("src/assets");
const maxW = 1280;
const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".png"));

if (!files.length) {
  console.log("No PNG files found in src/assets");
  process.exit(0);
}

for (const file of files) {
  const input = path.join(dir, file);
  const out = path.join(dir, file.replace(/\.png$/i, ".webp"));
  const meta = await sharp(input).metadata();
  let pipeline = sharp(input).rotate();
  if (meta.width && meta.width > maxW) {
    pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
  }
  await pipeline.webp({ quality: 78, alphaQuality: 85, effort: 5 }).toFile(out);
  const before = fs.statSync(input).size;
  const after = fs.statSync(out).size;
  console.log(
    `${file} ${Math.round(before / 1024)}KB → ${path.basename(out)} ${Math.round(after / 1024)}KB (${Math.round((100 * after) / before)}%)`,
  );
}
