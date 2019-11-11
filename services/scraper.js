const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { default: PQueue } = require('p-queue');
const { db } = require('../db');
const carData = require('../car_data');

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

async function fetchPrice(url, carName, carBrand) {
  async function logPrice(carPrice) {
    try {
      const timestamp = Date.now() / 1000;
      await db.query(
        `INSERT INTO logs (car_name, car_brand, car_price, created_at)
        VALUES ('${carName}', '${carBrand}', '${carPrice}', to_timestamp(${timestamp}))`,
      );
    } catch (e) {
      console.log(e);
    } finally {
      console.log(`logged -> ${carName}: $${carPrice}`);
    }
  }

  function findCarPrice($) {
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
      default: return null;
    }
  }

  try {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 90000 });
    const html = await page.content();
    const $ = cheerio.load(html);
    const carPrice = findCarPrice($);
    logPrice(carName, carBrand, parseInt(carPrice, 10));
    browser.close();
  } catch (e) {
    console.log(e);
  }
}

function execute() {
  Object.entries(carData).forEach(([carBrand, carUrls]) => {
    Object.entries(carUrls).forEach(([carName, url]) => {
      queue.add(() => fetchPrice(url, carName, carBrand));
    });
  });
}

execute();
