const path = require('path');
const { parseRoutesExcel } = require('../services/excelParser');

// Adjust filename if needed
const filePath = path.join(__dirname, '../../uploads/ROUTE 1-15.xlsx');

try {
  const routes = parseRoutesExcel(filePath);
  console.log('Parsed Routes (first 1):', JSON.stringify(routes[0], null, 2));
  console.log(`✅ Total routes parsed: ${routes.length}`);
} catch (err) {
  console.error('Error parsing Excel:', err.message);
}