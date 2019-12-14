const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const selectCarPrice = require('./select_car_price');
const db = require('../../db/db');

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

const scrape = async ({
  carName, carBrand, url, pattern,
}) => {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 90000,
  });
  const html = await page.content();
  const $ = cheerio.load(html);
  const carPrice = selectCarPrice($, pattern);
  const carPriceInt = parseInt(carPrice, 10);
  if (Number.isInteger(carPriceInt)) {
    throw new Error(`${carPrice} can not be parsed into integer}`);
  }
  const timestamp = Date.now() / 1000;
  browser.close();
  await db.query(
    `INSERT INTO "CarPriceLogs" ("carName", "carBrand", "carPrice", "url", "createdAt")
    VALUES ('${carName}', '${carBrand}', '${carPrice}', '${url}', to_timestamp(${timestamp}))`,
  );
};

module.exports = scrape;
