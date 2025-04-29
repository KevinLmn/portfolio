const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

const ASSETS_DIR = path.join(__dirname, "../src/Assets");
const QUALITY = 80;
const THUMB_WIDTH = 20;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const filename = path.basename(filePath, ext);
  const directory = path.dirname(filePath);
  const image = sharp(filePath);

  try {
    // Get image metadata
    const metadata = await image.metadata();

    // Only create WebP if it doesn't already exist
    const webpPath = path.join(directory, `${filename}.webp`);
    if (!(await fs.access(webpPath).catch(() => false))) {
      await image.clone().webp({ quality: QUALITY }).toFile(webpPath);
    }

    // Only create thumbnail if it doesn't exist
    const thumbPath = path.join(directory, `${filename}-thumb${ext}`);
    if (!(await fs.access(thumbPath).catch(() => false))) {
      await image
        .clone()
        .resize(THUMB_WIDTH)
        .jpeg({ quality: QUALITY })
        .toFile(thumbPath);
    }

    // Only optimize original if it's larger than 1MB
    const stats = await fs.stat(filePath);
    if (stats.size > 1024 * 1024) {
      const optimizedPath = path.join(directory, `${filename}-optimized${ext}`);
      await image
        .clone()
        .resize(metadata.width) // Preserve original dimensions
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(optimizedPath);

      // Safely replace original only if optimization was successful
      const optimizedStats = await fs.stat(optimizedPath);
      if (optimizedStats.size < stats.size) {
        await fs.rename(optimizedPath, filePath);
      } else {
        await fs.unlink(optimizedPath); // Delete if not smaller
      }
    }
  } catch (error) {
    throw new Error(`Error processing ${filename}${ext}: ${error.message}`);
  }
}

async function processDirectory(directory) {
  try {
    const files = await fs.readdir(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await processDirectory(filePath);
      } else {
        await optimizeImage(filePath);
      }
    }
  } catch (error) {
    throw new Error(
      `Error processing directory ${directory}: ${error.message}`
    );
  }
}

console.log("Starting image optimization...");
processDirectory(ASSETS_DIR)
  .then(() => console.log("Image optimization complete!"))
  .catch((error) => {
    console.error("Optimization failed:", error.message);
    process.exit(1);
  });
