const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '12341234', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;