/**
 * Generates WebP copies for large static assets (hero + bikes).
 * Next.js Image also serves AVIF/WebP at runtime when optimization is enabled.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const targets = [
  "hero-cinematic-ultra.png",
  path.join("bikes"),
  path.join("tour-packages", "bali-tours-map.png"),
  path.join("tours"),
];

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return;

  const outPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");
  const before = (await fs.stat(filePath)).size;

  await sharp(filePath)
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);

  const after = (await fs.stat(outPath)).size;
  const saved = Math.round((1 - after / before) * 100);
  console.log(`  ${path.relative(publicDir, filePath)} → .webp (−${saved}%)`);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else {
      await convertFile(full);
    }
  }
}

async function main() {
  console.log("Optimizing images in public/…\n");

  const hero = path.join(publicDir, "hero-cinematic-ultra.png");
  try {
    await convertFile(hero);
  } catch {
    console.warn("  hero-cinematic-ultra.png not found, skipping");
  }

  for (const rel of targets.slice(1)) {
    const dir = path.join(publicDir, rel);
    try {
      const stat = await fs.stat(dir);
      if (stat.isDirectory()) await walk(dir);
      else await convertFile(dir);
    } catch {
      console.warn(`  skip ${rel}`);
    }
  }

  console.log("\nDone. Source PNG/JPG kept; WebP siblings added for optional direct use.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
