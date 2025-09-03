/**
 * Trips Writer Service
 * --------------------
 * This module is responsible for:
 *  - Taking parsed routes with timetables
 *  - Converting them into GTFS trips.txt format
 *  - Writing the file into /output/trips.txt
 *
 * GTFS Fields:
 *  - route_id
 *  - service_id
 *  - trip_id
 *  - direction_id (optional, left blank for now)
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const path = require('path');

/* =========================================================================
   1. Generate GTFS trips.txt content
   ========================================================================= */
/**
 * @param {Array} routes - Array of route objects with timetable
 * @returns {string} CSV content for trips.txt
 */
function generateTripsTxt(routes) {
  const header = 'route_id,service_id,trip_id,direction_id';

  let rows = [];

  routes.forEach((route) => {
    route.timetable.forEach((entry, idx) => {
      const serviceId = entry.day || 'DAILY';
      const tripId = `R${route.route_id}_${serviceId}_${entry.time}_${idx + 1}`;

      rows.push(
        [
          route.route_id,
          serviceId,
          tripId,
          '', // direction_id left blank for now
        ].join(',')
      );
    });
  });

  return [header, ...rows].join('\n');
}

/* =========================================================================
   2. Write trips.txt to /output
   ========================================================================= */
function writeTripsFile(routes, outputDir = 'output') {
  const content = generateTripsTxt(routes);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'trips.txt');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ trips.txt written to ${filePath}`);
}

/* =========================================================================
   3. Exported API
   ========================================================================= */
module.exports = {
  generateTripsTxt,
  writeTripsFile,
};