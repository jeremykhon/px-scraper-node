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
  const fetchPrice = async (carName, url, carBrand, carPattern) => {
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
      switch (carPattern) {
        case 'toyota':
          return $('.mlp-welcome-msrp')
            .find('strong')
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'nissan':
          return $('.primary-price')
            .find('strong')
            .first()
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'honda':
          return $('.left-content.purchase-info')
            .find('h2')
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'subaru':
          return $('.spec-element-one')
            .find('span.font-sizes-big')
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'mazda':
          return $('.mde-home-trims__alternate--msrp')
            .find('p')
            .first()
            .children()
            .remove()
            .end()
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'mazda1':
          return $('.mdp-flexiblecontent-trims-carousel__slide-blurb.mdp-foundation-copy')
            .find('p')
            .first()
            .children()
            .remove()
            .end()
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'mazda2':
          return $('.mde-home-trims__trim--msrp')
            .find('p')
            .first()
            .children()
            .remove()
            .end()
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'lexus':
          return $('div.msrp')
            .find('div.price')
            .first()
            .attr('data-msrp');
        case 'mitsubishi':
          return $('div.pricing')
            .find('p.item-value')
            .children()
            .remove()
            .end()
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
        case 'acura':
          return $('span.price.acr-caption-3')
            .text()
            .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
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
      queue.add(() => fetchPrice(carName, carProperties.url, carProperties.brand, carProperties.pattern));
    });
  };

  execute();
}

exports.scraper = scraper;
