const Sequelize = require("sequelize");
const connection = require("../../config/db-connection");

// cria uma tabela de nome users
// com os campos title, slug e body
const User = connection.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// cria a tabela no banco - pode ser assim
//User.sync({ force: false });

// ou, assimm
User.sync({ force: false }).then(() => {
  // mensagem opcional -> pode ficar vazio
  console.log("Tabela 'users' criada com sucesso!");
});

module.exports = User;
