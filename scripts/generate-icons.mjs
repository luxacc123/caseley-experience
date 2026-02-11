/**
 * Generate favicons, app icons, and social preview images from the logo.
 * Usage: node scripts/generate-icons.mjs
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mkdir } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGO = join(ROOT, "public", "logo-caseley-experience.png");
const PUBLIC = join(ROOT, "public");
const APP = join(ROOT, "src", "app");

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

/**
 * Create a square icon by placing the logo centered on a white square canvas.
 */
async function generateSquareIcon(size, outputPath) {
  // Resize the logo to fit inside the square with padding
  const logoPadded = Math.round(size * 0.75); // logo takes ~75% of icon

  const resizedLogo = await sharp(LOGO)
    .resize(logoPadded, logoPadded, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
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

  console.log(`✓ ${outputPath} (${size}x${size})`);
}

/**
 * Create an OG/Twitter social preview image (logo centered on branded background).
 */
async function generateSocialImage(width, height, outputPath) {
  // Brand primary color: #0f2b46
  const bgColor = { r: 15, g: 43, b: 70, alpha: 1 };

  // Resize logo to fit with generous padding, then invert for dark bg
  const logoHeight = Math.round(height * 0.4);
  const resizedLogo = await sharp(LOGO)
    .resize(null, logoHeight, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .negate({ alpha: false }) // invert colors (dark logo → white on dark bg)
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

  console.log(`✓ ${outputPath} (${width}x${height})`);
}

async function main() {
  await ensureDir(PUBLIC);
  await ensureDir(APP);

  console.log("Generating icons from:", LOGO);
  console.log("");

  // Favicons (square, white bg)
  await generateSquareIcon(16, join(PUBLIC, "favicon-16.png"));
  await generateSquareIcon(32, join(PUBLIC, "favicon-32.png"));
  await generateSquareIcon(180, join(PUBLIC, "favicon-180.png"));
  await generateSquareIcon(512, join(PUBLIC, "favicon.png"));

  // App icons (Next.js file-based metadata)
  await generateSquareIcon(512, join(APP, "icon.png"));
  await generateSquareIcon(180, join(APP, "apple-icon.png"));

  // Social preview images
  await generateSocialImage(1200, 630, join(APP, "opengraph-image.png"));
  await generateSocialImage(1200, 630, join(APP, "twitter-image.png"));

  console.log("");
  console.log("Done! All icons and social images generated.");
}

main().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
