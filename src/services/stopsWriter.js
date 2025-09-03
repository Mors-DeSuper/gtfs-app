/**
 * Stops Writer Service
 * --------------------
 * This module is responsible for:
 *  - Taking parsed stops JSON
 *  - Converting it to GTFS stops.txt format
 *  - Writing the file into /output/stops.txt
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const path = require('path');

/* =========================================================================
   1. Generate GTFS stops.txt content
   ========================================================================= */
/**
 * @param {Array} stops - Array of stop objects { stop_id, stop_name, stop_lat, stop_lon }
 * @returns {string} CSV content for stops.txt
 */
function generateStopsTxt(stops) {
  const header = 'stop_id,stop_name,stop_lat,stop_lon';
  const rows = stops.map(
    (s) => `${s.stop_id},${s.stop_name},${s.stop_lat},${s.stop_lon}`
  );
  return [header, ...rows].join('\n');
}

/* =========================================================================
   2. Write stops.txt to /output
   ========================================================================= */
function writeStopsFile(stops, outputDir = 'output') {
  const content = generateStopsTxt(stops);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'stops.txt');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ stops.txt written to ${filePath}`);
}

/* =========================================================================
   3. Exported API
   ========================================================================= */
module.exports = {
  generateStopsTxt,
  writeStopsFile,
};