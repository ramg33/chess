const { Pool } = require("pg");
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
};

console.log("DB configuration:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

const pool = new Pool(dbConfig);

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connection to PostgreSQL", err);
    return;
  } else {
    console.log("Successful connection to PostgreSQL");
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
