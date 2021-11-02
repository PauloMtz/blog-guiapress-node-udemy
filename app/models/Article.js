const Sequelize = require("sequelize");
const connection = require("../../config/db-connection");
const Category = require("./Category");

// cria uma tabela de nome articles
// com os campos title, slug e body
const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

/*
    um relacionamento entre duas classes
    pode ser feita em apenas uma delas
    abaixo seguem os relacionamentos
    entre artigos e categorias
    na realidade, bastava apenas o primeiro
*/

// relacionamento um para muitos
Category.hasMany(Article);

// relacionamento um para um
Article.belongsTo(Category);

// esse force deve ser true para criar
// depois da tabela criada, fica false
Article.sync({ force: false }).then(() => {
  // mensagem opcional -> pode ficar vazio
  console.log("Tabela 'articles' criada com sucesso!");
});

module.exports = Article;
