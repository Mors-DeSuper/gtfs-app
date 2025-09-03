# GTFS App

This project helps generate and validate **GTFS feeds** from Excel/CSV inputs.  
It provides an API and services for turning input spreadsheets into GTFS files, 
zipping them, and validating with the [MobilityData GTFS validator](https://github.com/MobilityData/gtfs-validator).

## 🚀 Features
- Upload Excel/CSV with route and stop data
- Transform into standard GTFS text files
- Export as a GTFS `zip` package
- Run the GTFS validator and view validation reports

## 📦 Installation
Clone the repo and install dependencies:

```bash
git clone https://github.com/Mors-DeSuper/gtfs-app.git
cd gtfs-app
npm install
