/**
 * Zip Service
 * -----------
 * This module is responsible for:
 *  - Collecting all GTFS .txt files from /output
 *  - Zipping them into gtfs.zip
 *
 * Dependencies:
 *  - archiver (npm install archiver)
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/* =========================================================================
   1. Create GTFS Zip
   ========================================================================= */
/**
 * @param {string} outputDir - Directory containing GTFS .txt files
 * @param {string} zipName - Name of output zip file
 */
function createGtfsZip(outputDir = 'output', zipName = 'gtfs.zip') {
  const zipPath = path.join(outputDir, zipName);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    throw new Error(`Output directory not found: ${outputDir}`);
  }

  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ GTFS zip created: ${zipPath} (${archive.pointer()} bytes)`);
      resolve(zipPath);
    });

    archive.on('error', (err) => reject(err));

    archive.pipe(output);

    // Add all .txt files in outputDir
    const files = fs.readdirSync(outputDir).filter((f) => f.endsWith('.txt'));

    if (files.length === 0) {
      reject(new Error('No GTFS .txt files found in output directory'));
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(outputDir, file);
      archive.file(filePath, { name: file });
    });

    archive.finalize();
  });
}

/* =========================================================================
   2. Exported API
   ========================================================================= */
module.exports = {
  createGtfsZip,
};