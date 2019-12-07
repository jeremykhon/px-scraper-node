const express = require('express');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const { db } = require('../db/db');

const router = express.Router();
const sql = fs.readFileSync(path.join(__dirname, '/../db/sql/query.sql')).toString();

router.get('/source', async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM "CarPriceLogs"');
    res.render('source', { title: 'Source', rows: data.rows, fields: data.fields });
  } catch (error) {
    next(error);
  }
});

router.get('/downloadCSV', async (req, res, next) => {
  try {
    const data = await db.query(sql);
    const fields = data[1].fields.map((field) => field.name);
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data[1].rows);
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = await db.query(sql);
    res.render('index', { title: 'Car Prices', rows: data[1].rows, fields: data[1].fields });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
