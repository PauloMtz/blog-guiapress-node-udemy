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
};
