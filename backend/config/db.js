const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
  } else {
    console.log("PostgreSQL connected successfully at:", res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};