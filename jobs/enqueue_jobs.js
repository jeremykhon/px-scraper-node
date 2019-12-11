const scraperQueue = require('./scrape_job');
const carData = require('../lib/car_data');

function enqueueScrapeJobs() {
  Object.entries(carData).forEach(async ([carName, carProperties]) => {
    await scraperQueue.add({
      carName,
      carBrand: carProperties.brand,
      url: carProperties.url,
      pattern: carProperties.pattern,
    });
  });
}

enqueueScrapeJobs();
