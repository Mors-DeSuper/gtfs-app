/**
 * Routes Writer Service
 * ---------------------
 * This module is responsible for:
 *  - Taking parsed routes JSON from Excel
 *  - Converting it to GTFS routes.txt format
 *  - Writing the file into /output/routes.txt
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const path = require('path');

/* =========================================================================
   1. Generate GTFS routes.txt content
   ========================================================================= */
/**
 * @param {Array} routes - Array of route objects { route_id, route_short_name, route_long_name, route_type }
 * @returns {string} CSV content for routes.txt
 */
function generateRoutesTxt(routes) {
  const header = 'route_id,route_short_name,route_long_name,route_type';

  const rows = routes.map((r) =>
    [
      r.route_id,
      r.route_short_name.replace(/,/g, ''), // remove commas to keep CSV clean
      r.route_long_name.replace(/,/g, ''),
      r.route_type,
    ].join(',')
  );

  return [header, ...rows].join('\n');
}

/* =========================================================================
   2. Write routes.txt to /output
   ========================================================================= */
function writeRoutesFile(routes, outputDir = 'output') {
  const content = generateRoutesTxt(routes);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'routes.txt');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ routes.txt written to ${filePath}`);
}

/* =========================================================================
   3. Exported API
   ========================================================================= */
module.exports = {
  generateRoutesTxt,
  writeRoutesFile,
};