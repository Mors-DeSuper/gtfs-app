/**
 * Stop Times Writer Service
 * -------------------------
 * This module is responsible for:
 *  - Taking parsed routes with timetables
 *  - Converting them into GTFS stop_times.txt format
 *  - Writing the file into /output/stop_times.txt
 *
 * GTFS Fields:
 *  - trip_id
 *  - arrival_time
 *  - departure_time
 *  - stop_id
 *  - stop_sequence
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const path = require('path');

/* =========================================================================
   1. Helper: Format time (HHMM → HH:MM:SS)
   ========================================================================= */
function formatTime(value) {
  if (!value) return '';
  let str = String(value).padStart(4, '0'); // e.g. "0700"
  const hh = str.substring(0, 2);
  const mm = str.substring(2, 4);
  return `${hh}:${mm}:00`;
}

/* =========================================================================
   2. Generate GTFS stop_times.txt content
   ========================================================================= */
/**
 * @param {Array} routes - Array of route objects with timetable
 * @param {Array} stops - Array of stop objects { stop_id, stop_name }
 * @returns {string} CSV content for stop_times.txt
 */
function generateStopTimesTxt(routes, stops) {
  const header = 'trip_id,arrival_time,departure_time,stop_id,stop_sequence';

  let rows = [];

  routes.forEach((route) => {
    route.timetable.forEach((entry, idx) => {
      const tripId = `R${route.route_id}_${entry.day || 'DAILY'}_${entry.time}_${idx + 1}`;

      // Try to match stop_name → stop_id
      const stopName = entry.stops[0]; // Currently one stop per row
      const stop = stops.find(
        (s) => s.stop_name.toUpperCase() === stopName.toUpperCase()
      );

      const stopId = stop ? stop.stop_id : stopName; // fallback to raw name
      const time = formatTime(entry.time);

      rows.push([tripId, time, time, stopId, 1].join(','));
    });
  });

  return [header, ...rows].join('\n');
}

/* =========================================================================
   3. Write stop_times.txt to /output
   ========================================================================= */
function writeStopTimesFile(routes, stops, outputDir = 'output') {
  const content = generateStopTimesTxt(routes, stops);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'stop_times.txt');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ stop_times.txt written to ${filePath}`);
}

/* =========================================================================
   4. Exported API
   ========================================================================= */
module.exports = {
  generateStopTimesTxt,
  writeStopTimesFile,
};