const Sequelize = require("sequelize");

const connection = new Sequelize("guia_press", "root", "admin123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
