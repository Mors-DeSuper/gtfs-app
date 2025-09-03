/**
 * Agency Writer Service
 * ---------------------
 * This module is responsible for:
 *  - Creating a GTFS agency.txt
 *  - Writing the file into /output/agency.txt
 *
 * GTFS Fields:
 *  - agency_id
 *  - agency_name
 *  - agency_url
 *  - agency_timezone
 *  - agency_lang
 *
 * Author: Alan O'Loughlin
 * Date: 2025-09-02
 */

const fs = require('fs');
const path = require('path');

/* =========================================================================
   1. Generate GTFS agency.txt content
   ========================================================================= */
function generateAgencyTxt() {
  const header =
    'agency_id,agency_name,agency_url,agency_timezone,agency_lang';
  const row =
    'UPSI,Universiti Pendidikan Sultan Idris,http://www.upsi.edu.my,Asia/Kuala_Lumpur,en';

  return [header, row].join('\n');
}

/* =========================================================================
   2. Write agency.txt to /output
   ========================================================================= */
function writeAgencyFile(outputDir = 'output') {
  const content = generateAgencyTxt();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, 'agency.txt');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ agency.txt written to ${filePath}`);
}

/* =========================================================================
   3. Exported API
   ========================================================================= */
module.exports = {
  generateAgencyTxt,
  writeAgencyFile,
};