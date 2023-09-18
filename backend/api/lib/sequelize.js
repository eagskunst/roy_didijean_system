const { Sequelize } = require("sequelize");
const { config } = require('../config/config');
const setupModels = require("../db/models");

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
const cwd = process.cwd();
const sequelize = new Sequelize ('', '', '',{
  dialect: 'sqlite',
  storage: `${cwd}/backend/roy_didijean.db`,
  logging: true
})

setupModels(sequelize)

sequelize.sync();

module.exports = sequelize
