const articleModel = require("../models/Article");
const categoryModel = require("../models/Category");
// slugify é uma biblioteca do node para trabalhar com slug
// instalação [ npm install slugify --save ]
const slugify = require("slugify");
const auth = require("../middlewares/auth");

module.exports = function (application) {
  // carrega a página index
  application.get("/admin/articles", auth, function (req, res) {
    articleModel
      .findAll({
        // relacionamento com categorias
        include: [{ model: categoryModel }],
      })
      .then((articles) => {
        res.render("admin/articles/index", { articles: articles });
      });
  });

  // carrega a página de cadastro
  application.get("/admin/articles/new", auth, function (req, res) {
    categoryModel.findAll().then((categories) => {
      res.render("admin/articles/new", { categories: categories });
    });
  });

  // cadastra o artigo
  application.post("/admin/articles/save", auth, function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    /*console.log(
      "Título: " + title + "\nDescrição: " + body + "\nCategoria: " + category
    );*/

    articleModel
      .create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category,
      })
      .then(() => {
        res.redirect("/admin/articles");
      });
  });

  // exclui registro
  application.post("/admin/articles/delete", auth, function (req, res) {
    var id = req.body.id_form;

    if (id != undefined) {
      if (!isNaN(id)) {
        articleModel
          .destroy({
            where: {
              id: id,
            },
          })
          .then(() => {
            res.redirect("/admin/articles");
          });
      } else {
        res.redirect("/admin/articles");
      }
    } else {
      res.redirect("/admin/articles");
    }
  });

  // carrega a página de edição do registro
  application.get("/admin/articles/edit/:id", auth, function (req, res) {
    // recebe o id enviado pelo formulário
    var id = req.params.id;

    if (isNaN(id)) {
      res.redirect("/admin/articles");
    }

    // procura o id recebido no banco de dados
    articleModel
      .findByPk(id)
      .then((article) => {
        if (article != undefined) {
          categoryModel.findAll().then((categories) => {
            // carrega o arquivo lá na pasta views, enviando os dados do artigo
            res.render("admin/articles/edit", {
              article_view: article,
              categories: categories,
            });
          });
        } else {
          res.redirect("/admin/articles");
        }
      })
      .catch((erro) => {
        res.redirect("/admin/articles");
      });
  });

  // atualiza o cadastro de artigo
  application.post("/admin/articles/update", auth, function (req, res) {
    var id = req.body.id_form;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    articleModel
      .update(
        {
          title: title,
          slug: slugify(title),
          body: body,
          categoryId: category,
        },
        {
          where: {
            id: id,
          },
        }
      )
      .then(() => {
        res.redirect("/admin/articles");
      })
      .catch((err) => {
        res.redirect("/admin/articles");
      });
  });
};
