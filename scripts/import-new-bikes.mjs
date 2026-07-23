/**
 * One-time import: convert archive PNGs → public/bikes/*.webp
 * Run: node scripts/import-new-bikes.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "tmp-new-bikes", "Новые байки");
const OUT_DIR = path.join(process.cwd(), "public", "bikes");

/** slug → source filename (without path) */
const IMPORTS = [
  { id: "honda-crf150", file: "Honda CRF150.png", updateOnly: true },
  { id: "yamaha-wr155", file: "Yamaha WR155.png", updateOnly: true },
  {
    id: "royal-enfield-himalayan-410",
    file: "Royal Enfield Himalayan 410.png",
    updateOnly: true,
  },
  {
    id: "royal-enfield-classic-500",
    file: "Royal Enfield Classic 500.png",
    updateOnly: true,
  },
  { id: "yamaha-yzf-r6", file: "Yamaha YZF-R6 (2).png", updateOnly: true },
  { id: "honda-cbr250rr-abs-spqs", file: "Honda CBR250RR ABS SPQS.png" },
  { id: "honda-cbr250rr-sp-abs", file: "Honda CBR250RR SP ABS.png" },
  { id: "kawasaki-ninja-250-abs-custom", file: "Kawasaki Ninja 250 ABS Custom.png" },
  { id: "kawasaki-w175-black-gloss", file: "Kawasaki W175 Black Gloss ABS FI.png" },
  { id: "kawasaki-w175-black", file: "Kawasaki W175 Black.png" },
  { id: "kawasaki-z250sl-custom-black", file: "Kawasaki Z250SL Custom Black.png" },
  { id: "kawasaki-zx250r", file: "Kawasaki ZX250R.png" },
  { id: "qjmotor-srv-200-mt", file: "QJMotor SRV 200 MT.png" },
  { id: "qjmotor-srv-600-v-abs-v4", file: "QJMotor SRV 600 V ABS V4.png" },
  { id: "qjmotor-tourino-250-dx-abs", file: "QJMotor Tourino 250 Dx ABS.png" },
  { id: "royal-enfield-500-blue", file: "Royal Enfield 500 Blue.png" },
  { id: "royal-enfield-350-army-green", file: "Royal Enfield 350 ABS Army Green.png" },
  { id: "royal-enfield-super-meteor-650", file: "Royal Enfield Super Meteor 650 ABS.png" },
  { id: "sm-sport-v16", file: "SM Sport V16.png" },
  { id: "sm-sport-v16-custom-bobber", file: "SM Sport V16 Custom Bobber.png" },
  { id: "sm-sport-v16-rusty", file: "SM Sport V16 Rusty.png" },
  { id: "suzuki-thunder-150-tracker", file: "Suzuki Thunder 150 Tracker.png" },
  { id: "suzuki-thunder-anarchy", file: "Suzuki Thunder Anarchy.png" },
  { id: "tvs-ronin-triumph-style-225", file: "TVS Ronin Custom Triumph Style 225 ABS.png" },
  { id: "yamaha-byson-f1", file: "Yamaha Byson F1.png" },
  { id: "yamaha-mt25", file: "Yamaha MT25.png" },
  { id: "yamaha-r15m-abs-qs", file: "Yamaha R15M ABS QS Connected.png" },
  { id: "yamaha-r25-black", file: "Yamaha R25 Black ABS.png" },
  { id: "yamaha-r3-320-blue", file: "Yamaha R3 320cc Blue ABS.png" },
  { id: "yamaha-scorpio-cafe-racer", file: "Yamaha Scorpio CafeRacer.png" },
  { id: "yamaha-scorpio-tracker-black", file: "Yamaha Scorpio Tracker Black.png" },
  { id: "yamaha-scorpio-tracker-brown", file: "Yamaha Scorpio Tracker Brown.png" },
  { id: "yamaha-xabre", file: "Yamaha Xabre (2).png" },
  { id: "yamaha-xsr155", file: "Yamaha XSR155 (2).png" },
];

async function convert(srcPath, outPath) {
  await sharp(srcPath)
    .resize(1200, 900, { fit: "cover", position: "centre" })
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);
  const stat = await fs.stat(outPath);
  console.log(`  ✓ ${path.basename(outPath)} (${Math.round(stat.size / 1024)} KB)`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log("Importing bike images…\n");

  for (const item of IMPORTS) {
    const src = path.join(SRC_DIR, item.file);
    const out = path.join(OUT_DIR, `${item.id}.webp`);
    try {
      await fs.access(src);
    } catch {
      console.error(`  ✗ Missing source: ${item.file}`);
      continue;
    }
    await convert(src, out);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
