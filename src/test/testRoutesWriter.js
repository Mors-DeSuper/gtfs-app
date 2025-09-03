const path = require('path');
const { parseRoutesExcel } = require('../services/excelParser');
const { writeRoutesFile } = require('../services/routesWriter');

// Path to your uploaded Excel file
const filePath = path.join(__dirname, '../../uploads/ROUTE 1-15.xlsx');

try {
  const routes = parseRoutesExcel(filePath);
  console.log(`Parsed ${routes.length} routes`);
  writeRoutesFile(routes);
} catch (err) {
  console.error('Error:', err.message);
}