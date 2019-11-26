const express = require('express');
const { db } = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
  const getData = async () => {
    const data = await db.query('SELECT * FROM logs');
    res.render('chart', { carData: data.rows });
  };
  getData();
});

module.exports = router;
