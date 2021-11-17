const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const session = require("express-session");

module.exports = function (application) {
  // carrega os artigos na página index
  application.get("/admin/login", function (req, res) {
    res.render("admin/login");
  });

  // faz o login
  application.post("/admin/authenticate", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    //console.log("Email: " + email + "\nsenha: " + password);

    userModel.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        var correctPass = bcrypt.compareSync(password, user.password);

        if (correctPass) {
          req.session.user = {
            id: user.id,
            email: user.email,
          };
          res.redirect("/admin/articles");
        } else {
          res.redirect("/admin/login");
        }
      } else {
        res.redirect("/admin/login");
      }
    });
  });

  // faz o logout
  application.get("/admin/logout", function (req, res) {
    req.session.user = undefined;
    res.redirect("/");
  });
};
