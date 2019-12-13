const scraperQueue = require('../jobs/scrape_job');
const carData = require('../cars_source_data');
const db = require('../db/db');

async function enqueueScrapeJobs() {
  try {
    await db.connect();
    Object.entries(carData).forEach(async ([carName, carProperties]) => {
      await scraperQueue.add(
        'scrape job',
        {
          carName,
          carBrand: carProperties.brand,
          url: carProperties.url,
          pattern: carProperties.pattern,
        },
        {
          attempts: 3,
          backoff: 5000,
        },
      );
    });
  } catch (error) {
    console.error(error, error.stack);
  }
}

enqueueScrapeJobs();
