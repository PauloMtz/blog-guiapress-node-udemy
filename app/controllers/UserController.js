const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

module.exports = function (application) {
  // carrega a página de lista
  application.get("/admin/users", auth, function (req, res) {
    userModel.findAll().then((users) => {
      res.render("admin/users/index", { users: users });
    });
  });

  // carrega a página de cadastro
  application.get("/admin/users/new", auth, function (req, res) {
    res.render("admin/users/new");
  });

  // cadastra categoria
  application.post("/admin/users/save", auth, function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    // verifica se o e-mail já está cadastrado
    userModel.findOne({ where: { email: email } }).then((user) => {
      if (user == undefined) {
        var salt = bcrypt.genSaltSync(10);
        var hashPass = bcrypt.hashSync(password, salt);

        // se estiver ok -> salva no banco de dados
        userModel
          .create({
            // name no banco recebe a variável name
            name: name,
            email: email,
            password: hashPass,
          })
          .then(() => {
            res.redirect("/admin/users");
          });
      } else {
        res.redirect("/admin/users/new");
      }
    });
  });

  // exclui registro
  application.post("/admin/users/delete", auth, function (req, res) {
    var id = req.body.id_form;

    if (id != undefined) {
      if (!isNaN(id)) {
        userModel
          .destroy({
            where: {
              id: id,
            },
          })
          .then(() => {
            res.redirect("/admin/users");
          });
      } else {
        res.redirect("/admin/users");
      }
    } else {
      res.redirect("/admin/users");
    }
  });
};
