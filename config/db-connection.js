const Sequelize = require("sequelize");

const connection = new Sequelize("guia_press", "root", "admin123", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
