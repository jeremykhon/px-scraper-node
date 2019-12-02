require('dotenv').config();
const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function dbStart() {
  await db.connect();
  console.log('Connected successfully');
}

exports.dbStart = dbStart;
exports.db = db;
