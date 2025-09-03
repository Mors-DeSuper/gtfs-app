/**
 * Excel Parser Service
 * --------------------
 * This module is responsible for:
 *  - Parsing UPSI Excel route files (ROUTE 1–15.xlsx)
 *  - Extracting route, trip, and timetable information
 *  - Returning structured JSON for GTFS transformation
 *
 * Dependencies:
 *  - xlsx (for Excel parsing)
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const XLSX = require('xlsx');

/* =========================================================================
   1. Helper: Clean and normalize strings
   ========================================================================= */
function clean(value) {
  if (!value) return '';
  return String(value).trim();
}

/* =========================================================================
   2. Parse a single route sheet → JSON
   ========================================================================= */
/**
 * @param {Object} sheet - XLSX worksheet object
 * @param {string} sheetName - e.g. "ROUTE 1"
 * @returns {Object} route object with timetable
 */
function parseRouteSheet(sheet, sheetName) {
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  if (rows.length < 3) {
    return null;
  }

  // Route info: first row contains "ROUTE 1: KAB - KHAR - P.TIMUR"
  const routeInfo = clean(rows[0][0]);
  const [routeShort, routeLong] = routeInfo.split(':').map(clean);
  const routeId = sheetName.replace(/\D/g, ''); // Extract digits from "ROUTE 1"

  const timetable = [];

  // Start after row 2 (skip route info + header row)
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 2) continue;

    const time = clean(row[0]); // Column A = time (e.g. "0700")
    const stop = clean(row[1]); // Column B = stop name (e.g. "KAB")

    // Skip invalid or header-like rows
    if (
      !time ||
      !stop ||
      stop.toUpperCase().includes('TOTAL') ||
      stop.toUpperCase().includes('NO BUS') ||
      time.toUpperCase() === 'TIME'
    ) {
      continue;
    }

    timetable.push({
      day: 'DAILY', // Default — can refine later if needed
      time,
      stops: [stop],
    });
  }

  return {
    route_id: routeId,
    route_short_name: routeShort || `ROUTE ${routeId}`,
    route_long_name: routeLong || `Route ${routeId}`,
    route_type: 3, // bus
    timetable,
  };
}

/* =========================================================================
   3. Parse entire Excel file → All routes
   ========================================================================= */
/**
 * @param {string} filePath - Path to Excel file
 * @returns {Array} array of route objects
 */
function parseRoutesExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const routes = [];

  workbook.SheetNames.forEach((sheetName) => {
    if (sheetName.toUpperCase().startsWith('ROUTE')) {
      const sheet = workbook.Sheets[sheetName];
      const route = parseRouteSheet(sheet, sheetName);
      if (route) routes.push(route);
    }
  });

  return routes;
}

/* =========================================================================
   4. Exported API
   ========================================================================= */
module.exports = {
  parseRoutesExcel,
};