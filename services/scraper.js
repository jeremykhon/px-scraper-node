const axios = require('axios');

const url = 'https://www.toyota.com/rav4/';

axios.get(url)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => console.log(error));
