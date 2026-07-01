require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    database: process.env.PSQL_DB_HELLO_SITE,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PW,
})

module.exports = pool;