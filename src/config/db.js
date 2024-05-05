const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(
  process.env.DB_Name,
  process.env.DB_User,
  process.env.DB_Password,
  {
    host: process.env.DB_Host,
    dialect: process.env.DB_Dialect,
    port: process.env.DB_Port,
  }
);
