var app = require("./config/app");

/* -------------------------------------------
    Inicialização do projeto
    - npm init

    Instalações
    - npm install express --save
    - npm install ejs --save
    - npm install body-parser --save
    - npm install sequelize --save
    - npm install mysql2 --save
    - npm install consign --save
--------------------------------------------- */

app.listen(8080, function () {
  console.log("Aplicação iniciada em http://localhost:8080");
});
