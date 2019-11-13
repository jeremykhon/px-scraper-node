const express = require('express');
const fs = require('fs');
const path = require('path');
const { db } = require('../db');

const router = express.Router();
const sql = fs.readFileSync(path.join(__dirname, 'query.sql')).toString();

router.get('/', (req, res, next) => {
  const getData = async () => {
    const data = await db.query(sql);
    res.render('index', { rows: data[1].rows, fields: data[1].fields });
  };
  getData();
});

module.exports = router;
