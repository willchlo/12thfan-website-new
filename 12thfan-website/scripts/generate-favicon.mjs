import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
/** Source art from repo root (wide logo; scaled to square icon). */
const input = join(root, "12thico.png");
/** Only `public/` — avoid `src/app/icon.png`, which Next serves at `/icon` and caches hard in dev. */
const outputs = [join(publicDir, "favicon.png")];

const BG = { r: 0, g: 0, b: 0, alpha: 0 };
/** Final square size (px) served to browsers. */
const SIZE = 320;
/**
 * Logo is fitted inside `SIZE * FIT_BOX` with `contain` (no cropping), then centered on the canvas.
 * Slightly under 1.0 leaves transparent margin so thin line art isn’t clipped by rounded tab masks.
 * (Solid “app tile” favicons look bigger; line art needs this breathing room.)
 */
const FIT_BOX = 0.9;

async function main() {
  const box = Math.round(SIZE * FIT_BOX);
  const fitted = await sharp(input)
    .ensureAlpha()
    .resize(box, box, {
      fit: "contain",
      position: "centre",
      kernel: sharp.kernel.lanczos3,
      background: BG,
    })
    .toBuffer();

  const { width: w, height: h } = await sharp(fitted).metadata();
  const width = w ?? box;
  const height = h ?? box;
  const left = Math.floor((SIZE - width) / 2);
  const top = Math.floor((SIZE - height) / 2);

  const png = await sharp({
    create: { width: SIZE, height: SIZE, channels: 4, background: BG },
  })
    .composite([{ input: fitted, left, top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  for (const out of outputs) {
    await sharp(png).toFile(out);
    console.log("Wrote", out);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
