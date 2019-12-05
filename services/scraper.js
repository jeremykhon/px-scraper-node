const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { default: PQueue } = require('p-queue');
const { db, dbStart } = require('../db');
const carData = require('../lib/car_data');

const queue = new PQueue({ concurrency: 3 });

const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certifcate-errors',
  '--ignore-certifcate-errors-spki-list',
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
];

const chromeOptions = {
  args,
  headless: true,
  ignoreHTTPSErrors: true,
  userDataDir: './tmp',
};

function scraper() {
  const fetchPrice = async (carName, url, carBrand) => {
    const logPrice = async (carPrice) => {
      try {
        const timestamp = Date.now() / 1000;
        await db.query(
          `INSERT INTO "CarPriceLogs" ("carName", "carBrand", "carPrice", "url", "createdAt")
          VALUES ('${carName}', '${carBrand}', '${carPrice}', '${url}', to_timestamp(${timestamp}))`,
        );
      } catch (e) {
        console.error(e);
      }
    };

    const findCarPrice = ($) => {
      switch (carBrand) {
        case 'Toyota':
          return $('.mlp-welcome-msrp')
            .find('strong')
            .text()
            .trim()
            .replace(/[,$]/g, '');
        case 'Nissan':
          return $('.primary-price')
            .find('strong')
            .first()
            .text()
            .replace(/[,$]/g, '');
        default:
          return null;
      }
    };

    try {
      const browser = await puppeteer.launch(chromeOptions);
      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: 'load',
        timeout: 90000,
      });
      const html = await page.content();
      const $ = cheerio.load(html);
      const carPrice = findCarPrice($);
      logPrice(parseInt(carPrice, 10));
      browser.close();
    } catch (e) {
      console.error(e);
    }
  };

  const execute = () => {
    dbStart();
    Object.entries(carData).forEach(([carName, carProperties]) => {
      queue.add(() => fetchPrice(carName, carProperties.url, carProperties.brand));
    });
    console.log('done scraping');
  };

  execute();
}

exports.scraper = scraper;
