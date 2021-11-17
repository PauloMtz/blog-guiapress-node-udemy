const express = require("express");
const app = express();
const consign = require("consign");
const bodyParser = require("body-parser");
const connection = require("../config/db-connection");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("app/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configura sessão
app.use(
  session({
    secret: "pode_ser_qualquer_coisa_preferencialmente_aleatório",
    cookie: { maxAge: 1000 * 60 * 60 * 2 }, // 2 horas
  })
);

// testando a conexão
connection
  .authenticate()
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

consign().include("app/controllers").then("config/db-connection.js").into(app);

module.exports = app;
