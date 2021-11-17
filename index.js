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
    - npm install bcryptjs --save
    - npm install express-session --save
--------------------------------------------- */

/*
  Atenção!!!
  - se der o erro 'Error: listen EADDRINUSE: address already in use :::8080'
  - rodar o comando 'pkill -f nodemon' 
  - rodar o nodemon novamente para iniciar aplicação
*/

app.listen(8080, function () {
  console.log("Aplicação iniciada em http://localhost:8080");
});
