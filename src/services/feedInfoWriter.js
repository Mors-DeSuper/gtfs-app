/**
 * Feed Info Writer Service
 * ------------------------
 * This module is responsible for:
 *  - Creating a GTFS feed_info.txt
 *  - Writing the file into /output/feed_info.txt
 *
 * GTFS Fields:
 *  - feed_publisher_name
 *  - feed_publisher_url
 *  - feed_lang
 *  - feed_start_date
 *  - feed_end_date
 *  - feed_version
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
   2. Generate GTFS feed_info.txt content
   ========================================================================= */
function generateFeedInfoTxt() {
  const today = new Date();
  const startDate = formatDate(new Date(today.getFullYear(), 0, 1));
  const endDate = formatDate(new Date(today.getFullYear(), 11, 31));
  const version = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  const header =
    'feed_publisher_name,feed_publisher_url,feed_lang,feed_start_date,feed_end_date,feed_version';
  const row = `UPSI,http://www.upsi.edu.my,en,${startDate},${endDate},${version}`;

  return [header, row].join('\n');
}

/* =========================================================================
   3. Write feed_info.txt to /output
   ========================================================================= */
function writeFeedInfoFile(outputDir = 'output') {
  const content = generateFeedInfoTxt();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'feed_info.txt');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ feed_info.txt written to ${filePath}`);
}

/* =========================================================================
   4. Exported API
   ========================================================================= */
module.exports = {
  generateFeedInfoTxt,
  writeFeedInfoFile,
};