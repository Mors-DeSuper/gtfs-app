const path = require('path');
const { parseRoutesExcel } = require('../services/excelParser');
const { writeTripsFile } = require('../services/tripsWriter');

// Path to your Excel file
const filePath = path.join(__dirname, '../../uploads/ROUTE 1-15.xlsx');

try {
  const routes = parseRoutesExcel(filePath);
  console.log(`Parsed ${routes.length} routes`);
  writeTripsFile(routes);
} catch (err) {
  console.error('Error:', err.message);
}