const axios = require('axios');
const cheerio = require('cheerio');

const urls = {
  RAV4: 'https://www.toyota.com/camry/',
  Camry: 'https://www.toyota.com/camry/',
  Corolla: 'https://www.toyota.com/corolla/',
  Tacoma: 'https://www.toyota.com/tacoma/',
  Highlander: 'https://www.toyota.com/highlander/',
  '4Runner': 'https://www.toyota.com/4runner/',
  Tundra: 'https://www.toyota.com/tundra/',
  Prius: 'https://www.toyota.com/prius/',
  Yaris: 'https://www.toyota.com/yaris/'
};

Object.entries(urls).forEach(([name, url]) => {
  axios.get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const msrp = $('.mlp-welcome-msrp').find('strong').text().trim();
      console.log(`${name}: ${msrp}`);
    })
    .catch((error) => console.log(error));
});
