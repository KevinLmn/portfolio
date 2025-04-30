const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "out");

// Function to wait for a specified time
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to force delete a file using PowerShell
function forceDeleteFile(filePath) {
  try {
    const command = `powershell -Command "Remove-Item -Path '${filePath}' -Force -ErrorAction SilentlyContinue"`;
    execSync(command);
    return true;
  } catch (err) {
    return false;
  }
}

// Function to force delete a directory using PowerShell
function forceDeleteDirectory(dirPath) {
  try {
    const command = `powershell -Command "Remove-Item -Path '${dirPath}' -Recurse -Force -ErrorAction SilentlyContinue"`;
    execSync(command);
    return true;
  } catch (err) {
    return false;
  }
}

// Function to safely delete a file with retries
async function safeDeleteFile(filePath, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      if (fs.existsSync(filePath)) {
        // Try normal deletion first
        try {
          fs.unlinkSync(filePath);
          return true;
        } catch (err) {
          // If normal deletion fails, try force deletion
          if (forceDeleteFile(filePath)) {
            return true;
          }
        }
      }
      return true;
    } catch (err) {
      console.warn(
        `Attempt ${i + 1}/${maxRetries} to delete ${filePath} failed: ${
          err.message
        }`
      );
      if (i < maxRetries - 1) {
        await wait(500 * (i + 1)); // Longer delay between attempts
      }
    }
  }
  return false;
}

// Function to safely delete a directory with retries
async function safeDeleteDirectory(dirPath, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      if (fs.existsSync(dirPath)) {
        // Try normal deletion first
        try {
          fs.rmdirSync(dirPath, { recursive: true });
          return true;
        } catch (err) {
          // If normal deletion fails, try force deletion
          if (forceDeleteDirectory(dirPath)) {
            return true;
          }
        }
      }
      return true;
    } catch (err) {
      console.warn(
        `Attempt ${
          i + 1
        }/${maxRetries} to delete directory ${dirPath} failed: ${err.message}`
      );
      if (i < maxRetries - 1) {
        await wait(500 * (i + 1)); // Longer delay between attempts
      }
    }
  }
  return false;
}

// Function to recursively delete a directory
async function deleteDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  try {
    const files = fs.readdirSync(dirPath);

    // First, try to delete all files
    for (const file of files) {
      const curPath = path.join(dirPath, file);
      try {
        const stats = fs.lstatSync(curPath);
        if (stats.isDirectory()) {
          await deleteDirectory(curPath);
        } else {
          await safeDeleteFile(curPath);
        }
      } catch (err) {
        console.warn(`Warning: Could not process ${curPath}: ${err.message}`);
      }
    }

    // Then try to delete the directory itself
    await safeDeleteDirectory(dirPath);
  } catch (err) {
    console.warn(
      `Warning: Could not read directory ${dirPath}: ${err.message}`
    );
  }
}

// Main cleanup function
async function cleanup() {
  try {
    console.log("Starting aggressive cleanup...");

    // First try to force delete the entire directory
    if (forceDeleteDirectory(outDir)) {
      console.log("Successfully force deleted the directory!");
      return;
    }

    // If force delete fails, try to delete specific problematic files
    const problematicFiles = [
      path.join(outDir, "images", "alpiq1.webp"),
      path.join(outDir, "favicon.png"),
      path.join(outDir, "favicon.webp"),
      // Add other problematic files here if needed
    ];

    for (const file of problematicFiles) {
      await safeDeleteFile(file);
    }

    // Then try to delete the entire directory
    await deleteDirectory(outDir);
    console.log("Build directory cleaned successfully!");
  } catch (err) {
    console.warn(`Warning: Could not clean build directory: ${err.message}`);
    console.log("Continuing with build...");
  }
}

// Run the cleanup
cleanup();
