require('dotenv').config();
const { Client } = require('pg');

const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

async function dbStart() {
  await db.connect();
  console.log('Connected successfully');
}

exports.dbStart = dbStart;
exports.db = db;
