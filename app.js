const express = require('express');
const app = express();
const port = 3000;
const routesUsers = require('./src/compUsers/routesUsers');
const routesImages = require('./src/compImages/routesImages');
const dataBase = require('./dataBase');
const aws = require('./conf_AWS');

// Images call-----------------------------------------------------------
app.use('/images',routesImages)

// Users call------------------------------------------------------------
app.use('/users', routesUsers);

//Connection à la DB, Lancement du serveur-------------------------------
app.listen(port,function (req, res) {
  console.log('Express server listening on port: ' + port);
})
