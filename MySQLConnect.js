"use strict";
exports.__esModule = true;
exports.db = void 0;
var mysql = require('mysql2/promise');
require('dotenv').config();
exports.db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
//# sourceMappingURL=MySQLConnect.js.map