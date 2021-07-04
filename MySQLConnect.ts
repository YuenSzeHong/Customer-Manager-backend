const mysql = require('mysql2/promise');
require('dotenv').config()
export const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

