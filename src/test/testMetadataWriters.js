const { writeAgencyFile } = require('../services/agencyWriter');
const { writeFeedInfoFile } = require('../services/feedInfoWriter');

try {
  writeAgencyFile();
  writeFeedInfoFile();
} catch (err) {
  console.error('Error:', err.message);
}