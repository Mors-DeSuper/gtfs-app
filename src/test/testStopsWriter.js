const path = require('path');
const { parseStopsCSV } = require('../services/csvParser');
const { writeStopsFile } = require('../services/stopsWriter');

// Path to your uploaded CSV
const filePath = path.join(__dirname, '../../uploads/UPSI- Shuttle Bus Stops.csv');

try {
  const stops = parseStopsCSV(filePath);
  writeStopsFile(stops);
} catch (err) {
  console.error('Error:', err.message);
}