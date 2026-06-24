require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.PSQL_HOST,
    post: process.env.PSQL_PORT,
    database: process.env.PSQL_DB_HELLO_SITE,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_USER,
})

module.exports = pool;