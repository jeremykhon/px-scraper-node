const express = require('express');
const fs = require('fs');
const path = require('path');
const { db } = require('../db/db');

const router = express.Router();
const sql = fs.readFileSync(path.join(__dirname, '/../db/sql/query.sql')).toString();

router.get('/source', (req, res, next) => {
  const getData = async () => {
    try {
      const data = await db.query('SELECT * FROM "CarPriceLogs"');
      res.render('source', { title: 'Source', rows: data.rows, fields: data.fields });
    } catch (error) {
      next(error);
    }
  };
  getData();
});

router.get('/', (req, res, next) => {
  const getData = async () => {
    try {
      const data = await db.query(sql);
      res.render('index', { title: 'Car Prices', rows: data[1].rows, fields: data[1].fields });
    } catch (error) {
      next(error);
    }
  };
  getData();
});

module.exports = router;
