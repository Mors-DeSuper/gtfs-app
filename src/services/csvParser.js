/**
 * CSV Parser Service
 * ------------------
 * This module is responsible for:
 *  - Parsing the UPSI bus stops CSV file
 *  - Extracting stop_id, stop_name, stop_lat, stop_lon
 *  - Returning an array of GTFS-compliant stop objects
 *
 * Dependencies:
 *  - papaparse (for CSV parsing)
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const Papa = require('papaparse');

/* =========================================================================
   1. Helper: Parse WKT or raw coordinates into { lat, lon }
   ========================================================================= */
/**
 * Parse WKT or raw coordinates into { lat, lon }
 * Supports:
 *   - "POINT(lon lat)"
 *   - "lon lat"
 */
function parseWKT(value) {
  if (!value || typeof value !== 'string') {
    throw new Error(`Invalid coordinate value: ${value}`);
  }

  let lon, lat;

  if (value.startsWith('POINT')) {
    // Format: POINT(lon lat)
    const coords = value
      .replace('POINT', '')
      .replace('(', '')
      .replace(')', '')
      .trim()
      .split(/\s+/);

    lon = parseFloat(coords[0]);
    lat = parseFloat(coords[1]);
  } else {
    // Format: "lon lat"
    const coords = value.trim().split(/\s+/);
    lon = parseFloat(coords[0]);
    lat = parseFloat(coords[1]);
  }

  if (isNaN(lat) || isNaN(lon)) {
    throw new Error(`Invalid coordinates: ${value}`);
  }

  return { lat, lon };
}

/* =========================================================================
   2. Core: Parse Bus Stops CSV → JSON (GTFS stops format)
   ========================================================================= */
function parseStopsCSV(filePath) {
  // Load file
  const csvContent = fs.readFileSync(filePath, 'utf-8');

  // Parse CSV
  const parsed = Papa.parse(csvContent, {
    header: true,         // use first row as header
    skipEmptyLines: true, // ignore blanks
  });

  if (parsed.errors.length > 0) {
    console.error('CSV parsing errors:', parsed.errors);
    throw new Error('Failed to parse CSV');
  }

  // Transform rows into GTFS stops
  const stops = parsed.data.map((row, index) => {
    const { lat, lon } = parseWKT(row.WKT);

    return {
      stop_id: row.ID || `STOP_${index + 1}`,
      stop_name: row.name || `Stop ${index + 1}`,
      stop_lat: lat,
      stop_lon: lon,
    };
  });

  return stops;
}

/* =========================================================================
   3. Exported API
   ========================================================================= */
module.exports = {
  parseStopsCSV,
};