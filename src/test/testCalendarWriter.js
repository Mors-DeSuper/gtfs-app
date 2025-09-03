const { writeCalendarFile } = require('../services/calendarWriter');

try {
  writeCalendarFile();
} catch (err) {
  console.error('Error:', err.message);
}