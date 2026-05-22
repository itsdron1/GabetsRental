import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public", "favicon.svg"));

const pngTargets = [
  { size: 16, out: "public/favicon-16x16.png" },
  { size: 32, out: "public/favicon-32x32.png" },
  { size: 180, out: "public/apple-touch-icon.png" },
  { size: 192, out: "public/icon-192.png" },
  { size: 512, out: "public/icon-512.png" },
];

for (const { size, out } of pngTargets) {
  const buf = await sharp(svg).resize(size, size).png().toBuffer();
  writeFileSync(join(root, out), buf);
  if (size === 180) {
    writeFileSync(join(root, "app", "apple-icon.png"), buf);
  }
  if (size === 512) {
    writeFileSync(join(root, "app", "icon.png"), buf);
  }
}

const ico16 = await sharp(svg).resize(16, 16).png().toBuffer();
const ico32 = await sharp(svg).resize(32, 32).png().toBuffer();
const ico48 = await sharp(svg).resize(48, 48).png().toBuffer();
const ico = await toIco([ico16, ico32, ico48]);

writeFileSync(join(root, "public", "favicon.ico"), ico);
writeFileSync(join(root, "app", "favicon.ico"), ico);
writeFileSync(join(root, "app", "icon.svg"), svg);

console.log("Favicons generated.");
