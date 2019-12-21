const Queue = require('bull');
const Sentry = require('@sentry/node');
const scrape = require('../services/scraper/scrape');

const scraperQueue = new Queue('scraping', process.env.REDIS_URL);

scraperQueue.on('completed', (job) => {
  console.log(`Job with id ${job.id} completed, car: ${job.data.carName}`);
});

scraperQueue.process('scrape job', async (job) => {
  try {
    await scrape(job.data);
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
});

module.exports = scraperQueue;
