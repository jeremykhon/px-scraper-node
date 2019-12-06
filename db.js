require('dotenv').config();
const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function dbStart() {
  try {
    await db.connect();
    console.log('Connected successfully');
  } catch (err) {
    console.error(err);
  }
}

exports.dbStart = dbStart;
exports.db = db;
