const articleModel = require("../models/Article");
const categoriaModel = require("../models/Category");

module.exports = function (application) {
  // carrega os artigos na página index
  application.get("/", function (req, res) {
    articleModel
      .findAll({
        include: [{ model: categoriaModel }],
        order: [["id", "desc"]],
      })
      .then((articles) => {
        res.render("index", { articles: articles });
      });
  });

  // ler artigo
  application.get("/:slug", function (req, res) {
    var slug = req.params.slug;

    articleModel
      .findOne({
        where: {
          slug: slug,
        },
      })
      .then((article) => {
        if (article != undefined) {
          res.render("read-article", { article: article });
        } else {
          res.redirect("/");
        }
      })
      .catch((err) => {
        res.redirect("/");
      });
  });
};
