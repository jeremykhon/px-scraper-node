const Queue = require('bull');
const scrape = require('../services/scraper/scrape');

const scraperQueue = new Queue('scraping', process.env.REDIS_URL);

scraperQueue.on('log error', (e) => {
  console.error(e, e.stack);
});

scraperQueue.on('completed', (job) => {
  console.log(`Job with id ${job.id} completed, car: ${job.data.carName}`);
});

scraperQueue.process('scrape job', async (job) => {
  try {
    await scrape(job.data);
  } catch (e) {
    scraperQueue.emit('log error', e);
    throw e;
  }
});

module.exports = scraperQueue;
