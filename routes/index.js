const express = require('express');
const fs = require('fs');
const path = require('path');
const { db } = require('../db');

const router = express.Router();
const sql = fs.readFileSync(path.join(__dirname, '/../sql/query.sql')).toString();

router.get('/', (req, res, next) => {
  try {
    const getData = async () => {
      const data = await db.query(sql);
      res.render('index', { title: 'Car Prices', rows: data[1].rows, fields: data[1].fields });
    };
    getData();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
