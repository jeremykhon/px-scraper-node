const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  connect: async () => (
    pool.connect()
  ),
  query: async (text, params) => (
    pool.query(text, params)
  ),
};
