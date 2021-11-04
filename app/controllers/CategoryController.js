const categoryModel = require("../models/Category");
// slugify é uma biblioteca do node para trabalhar com slug
// instalação [ npm install slugify --save ]
const slugify = require("slugify");

module.exports = function (application) {
  application.get("/admin/categories", function (req, res) {
    res.render("admin/categories/new");
  });

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
          res.redirect("/");
        });
    } else {
      res.redirect("admin/categories/new");
    }
  });
};
