const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  connect: async () => {
    await pool.connect();
    console.log('db connected');
  },
  query: async (text, params) => (
    pool.query(text, params)
  ),
};
