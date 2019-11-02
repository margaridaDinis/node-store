const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node',
  password: '12341234'
});

module.exports = pool.promise();