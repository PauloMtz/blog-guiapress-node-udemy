const categoryModel = require("../models/Category");
// slugify é uma biblioteca do node para trabalhar com slug
// instalação [ npm install slugify --save ]
const slugify = require("slugify");

module.exports = function (application) {
  // carrega a página de lista
  application.get("/admin/categories", function (req, res) {
    categoryModel.findAll().then((categories) => {
      res.render("admin/categories/index", { categories: categories });
    });
  });

  // carrega a página de cadastro
  application.get("/admin/categories/new", function (req, res) {
    res.render("admin/categories/new");
  });

  // cadastra categoria
  application.post("/admin/categories/save", function (req, res) {
    var title = req.body.title;

    if (title != undefined) {
      // verificar antes o que está sendo enviado
      // res.send("Título: " + title);

      // se estiver ok -> salva no banco de dados
      categoryModel
        .create({
          // titulo no banco recebe a variável titulo
          title: title,
          slug: slugify(title),
        })
        .then(() => {
          res.redirect("/admin/categories");
        });
    } else {
      res.redirect("admin/categories/new");
    }
  });

  // exclui registro
  application.post("/admin/categories/delete", function (req, res) {
    var id = req.body.id_form;

    if (id != undefined) {
      if (!isNaN(id)) {
        categoryModel
          .destroy({
            where: {
              id: id,
            },
          })
          .then(() => {
            res.redirect("/admin/categories");
          });
      } else {
        res.redirect("/admin/categories");
      }
    } else {
      res.redirect("/admin/categories");
    }
  });

  // carrega a página de edição do registro
  application.get("/admin/categories/edit/:id", function (req, res) {
    // recebe o id enviado pelo formulário
    var id = req.params.id;

    if (isNaN(id)) {
      res.redirect("/admin/categories");
    }

    // procura o id recebido no banco de dados
    categoryModel
      .findByPk(id)
      .then((category) => {
        if (category != undefined) {
          // carrega o arquivo lá na pasta views, enviando os dados da categoria
          res.render("admin/categories/edit", { category_view: category });
        } else {
          res.redirect("/admin/categories");
        }
      })
      .catch((erro) => {
        res.redirect("/admin/categories");
      });
  });

  // atualiza o cadastro da categoria
  application.post("/admin/categories/update", function (req, res) {
    // recebe o id da categoria a ser atualizada e o campo de título
    var id = req.body.id_form;
    var title = req.body.title;

    categoryModel
      .update(
        { title: title, slug: slugify(title) },
        {
          where: {
            id: id,
          },
        }
      )
      .then(() => {
        res.redirect("/admin/categories");
      });
  });
};
