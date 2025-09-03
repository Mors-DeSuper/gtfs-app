const path = require('path');
const { parseStopsCSV } = require('../services/csvParser');
const { parseRoutesExcel } = require('../services/excelParser');
const { writeStopTimesFile } = require('../services/stopTimesWriter');

// File paths
const stopsFilePath = path.join(__dirname, '../../uploads/UPSI- Shuttle Bus Stops.csv');
const routesFilePath = path.join(__dirname, '../../uploads/ROUTE 1-15.xlsx');

try {
  const stops = parseStopsCSV(stopsFilePath);
  const routes = parseRoutesExcel(routesFilePath);

  console.log(`Parsed ${stops.length} stops and ${routes.length} routes`);
  writeStopTimesFile(routes, stops);
} catch (err) {
  console.error('Error:', err.message);
}