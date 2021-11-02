const Sequelize = require("sequelize");
const connection = require("../../config/db-connection");

// cria uma tabela de nome categories
// com os campos title e slug
const Category = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// esse force deve ser true para criar
// depois da tabela criada, fica false
Category.sync({ force: false }).then(() => {
  // mensagem opcional -> pode ficar vazio
  console.log("Tabela 'categories' criada com sucesso!");
});

module.exports = Category;
