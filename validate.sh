#!/bin/bash
# Run GTFS Validator on the current feed

java -jar ~/Downloads/gtfs-validator-7.1.0-cli.jar \
  -i backend/output/gtfs.zip \
  -o backend/output/validation-report