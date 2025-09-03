const path = require('path');
const { parseStopsCSV } = require('../services/csvParser');

const filePath = path.join(__dirname, '../../uploads/UPSI- Shuttle Bus Stops.csv');

try {
  const stops = parseStopsCSV(filePath);
  console.log('Parsed Stops (first 5):', stops.slice(0, 5));
} catch (err) {
  console.error('Error parsing CSV:', err.message);
}