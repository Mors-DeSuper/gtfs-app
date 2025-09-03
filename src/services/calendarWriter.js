/**
 * Calendar Writer Service
 * -----------------------
 * This module is responsible for:
 *  - Creating a GTFS calendar.txt
 *  - Writing the file into /output/calendar.txt
 *
 * GTFS Fields:
 *  - service_id
 *  - monday ... sunday (0 or 1)
 *  - start_date
 *  - end_date
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const path = require('path');

/* =========================================================================
   1. Helper: Format date as YYYYMMDD
   ========================================================================= */
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/* =========================================================================
   2. Generate GTFS calendar.txt content
   ========================================================================= */
/**
 * @param {Array} services - Array of service objects { service_id, days, start_date, end_date }
 * @returns {string} CSV content for calendar.txt
 */
function generateCalendarTxt(services) {
  const header =
    'service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date';

  const rows = services.map((s) => {
    return [
      s.service_id,
      s.monday,
      s.tuesday,
      s.wednesday,
      s.thursday,
      s.friday,
      s.saturday,
      s.sunday,
      s.start_date,
      s.end_date,
    ].join(',');
  });

  return [header, ...rows].join('\n');
}

/* =========================================================================
   3. Write calendar.txt to /output
   ========================================================================= */
function writeCalendarFile(outputDir = 'output') {
  // Default: DAILY schedule, valid for 2025
  const today = new Date();
  const startDate = formatDate(new Date(today.getFullYear(), 0, 1)); // Jan 1
  const endDate = formatDate(new Date(today.getFullYear(), 11, 31)); // Dec 31

  const services = [
    {
      service_id: 'DAILY',
      monday: 1,
      tuesday: 1,
      wednesday: 1,
      thursday: 1,
      friday: 1,
      saturday: 1,
      sunday: 1,
      start_date: startDate,
      end_date: endDate,
    },
  ];

  const content = generateCalendarTxt(services);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'calendar.txt');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ calendar.txt written to ${filePath}`);
}

/* =========================================================================
   4. Exported API
   ========================================================================= */
module.exports = {
  generateCalendarTxt,
  writeCalendarFile,
};