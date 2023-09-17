const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  "root",
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

const User = require('../models/User');

module.exports = sequelize;
