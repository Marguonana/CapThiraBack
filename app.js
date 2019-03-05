const express = require('express');
const app = express();
const port = 3000;
const routesUsers = require('./src/ControllerUsers/routesUsers');
const routesImages = require('./src/controllerImages/routesImages');
const dataBase = require('./dataBase');

// Images call-----------------------------------------------------------
app.use('/images',routesImages)

// Users call------------------------------------------------------------
app.use('/users', routesUsers);

//Connection à la DB, Lancement du serveur-------------------------------
app.listen(port,function (req, res) {
  console.log('Express server listening on port: ' + port);
})
