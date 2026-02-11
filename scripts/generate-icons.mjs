/**
 * Generate favicons, app icons, and social preview images from the logo.
 * Usage: node scripts/generate-icons.mjs
 *
 * Output filenames follow the standard convention:
 *   favicon.ico, favicon-16x16.png, favicon-32x32.png,
 *   apple-touch-icon.png (180×180),
 *   android-chrome-192x192.png, android-chrome-512x512.png,
 *   og.png (1200×630)
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mkdir, writeFile } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGO_DARK = join(ROOT, "public", "brand", "logo-wide-dark.png");
const MARK = join(ROOT, "public", "brand", "logo-mark.png");
const PUBLIC = join(ROOT, "public");
const APP = join(ROOT, "src", "app");

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

/**
 * Create a square icon by placing the mark centered on a white square canvas.
 */
async function generateSquareIcon(size, outputPath) {
  const logoPadded = Math.round(size * 0.75);

  const resizedLogo = await sharp(MARK)
    .resize(logoPadded, logoPadded, {
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const resizedMeta = await sharp(resizedLogo).metadata();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: resizedLogo,
        left: Math.round((size - resizedMeta.width) / 2),
        top: Math.round((size - resizedMeta.height) / 2),
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ ${outputPath} (${size}×${size})`);
}

/**
 * Generate a minimal .ico file wrapping 16×16 + 32×32 PNG payloads.
 * (ICO = ICONDIR header + ICONDIRENTRY per image + raw PNG data)
 */
async function generateFaviconIco(outputPath) {
  const sizes = [16, 32];
  const pngs = [];

  for (const size of sizes) {
    const logoPadded = Math.round(size * 0.75);
    const resized = await sharp(MARK)
      .resize(logoPadded, logoPadded, {
        fit: "inside",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();
    const meta = await sharp(resized).metadata();

    const buf = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite([
        {
          input: resized,
          left: Math.round((size - meta.width) / 2),
          top: Math.round((size - meta.height) / 2),
        },
      ])
      .png()
      .toBuffer();

    pngs.push({ size, buf });
  }

  // Build ICO binary
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize * pngs.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4); // count

  let offset = dataOffset;
  const entries = [];
  for (const { size, buf } of pngs) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size < 256 ? size : 0, 0); // width
    entry.writeUInt8(size < 256 ? size : 0, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // data size
    entry.writeUInt32LE(offset, 12); // data offset
    entries.push(entry);
    offset += buf.length;
  }

  const ico = Buffer.concat([
    header,
    ...entries,
    ...pngs.map((p) => p.buf),
  ]);

  await writeFile(outputPath, ico);
  console.log(`✓ ${outputPath} (favicon.ico, ${pngs.length} sizes)`);
}

/**
 * Create an OG/Twitter social preview image (logo centered on branded background).
 * Uses the pre-made dark (white-on-transparent) wide logo for best quality.
 */
async function generateSocialImage(width, height, outputPath) {
  // Brand primary color: #0f2b46
  const bgColor = { r: 15, g: 43, b: 70, alpha: 1 };

  const logoHeight = Math.round(height * 0.4);
  const resizedLogo = await sharp(LOGO_DARK)
    .resize(null, logoHeight, {
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const resizedMeta = await sharp(resizedLogo).metadata();

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: bgColor,
    },
  })
    .composite([
      {
        input: resizedLogo,
        left: Math.round((width - resizedMeta.width) / 2),
        top: Math.round((height - resizedMeta.height) / 2),
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ ${outputPath} (${width}×${height})`);
}

async function main() {
  await ensureDir(PUBLIC);
  await ensureDir(APP);

  console.log("Generating icons from:", MARK, "(favicons) +", LOGO_DARK, "(social)");
  console.log("");

  // ── /public/ favicons (standard filenames) ──
  await generateFaviconIco(join(PUBLIC, "favicon.ico"));
  await generateSquareIcon(16, join(PUBLIC, "favicon-16x16.png"));
  await generateSquareIcon(32, join(PUBLIC, "favicon-32x32.png"));
  await generateSquareIcon(180, join(PUBLIC, "apple-touch-icon.png"));
  await generateSquareIcon(192, join(PUBLIC, "android-chrome-192x192.png"));
  await generateSquareIcon(512, join(PUBLIC, "android-chrome-512x512.png"));

  // ── /src/app/ file-based metadata (Next.js) ──
  await generateSquareIcon(512, join(APP, "icon.png"));
  await generateSquareIcon(180, join(APP, "apple-icon.png"));

  // ── Social preview images ──
  await generateSocialImage(1200, 630, join(PUBLIC, "og.png"));
  await generateSocialImage(1200, 630, join(APP, "opengraph-image.png"));
  await generateSocialImage(1200, 630, join(APP, "twitter-image.png"));

  console.log("");
  console.log("Done! All icons and social images generated.");
}

main().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
