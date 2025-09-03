const { createGtfsZip } = require('../services/zipService');

(async () => {
  try {
    await createGtfsZip();
  } catch (err) {
    console.error('Error creating GTFS zip:', err.message);
  }
})();
