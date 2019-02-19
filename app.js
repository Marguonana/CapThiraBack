const express = require('express');
const app = express();
var mongoose = require('mongoose');
var hostname = 'localhost';
var port = 3000;
var mongoDB = 'mongodb://localhost:27017/dbCapThira';
var routesUtilisateurs = require('./src/utilisateurs/routesUtilisateurs');
var routesImages = require('./src/images/routesImages');

// Partie Image---------------------------------------------------------------
 app.use('/images',routesImages)

// Partie utilisateurs--------------------------------------------------------
app.use('/', routesUtilisateurs);

//Connection à la DB, Lancement du serveur------------------------------------
app.listen(port,function (req, res) {
  console.log('CapThira est en écoute au port 3000!');
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error',console.error.bind(console, 'erreur de connection à mongodb'));
  
  db.once('open', function(){
    console.log("Connexion à CapThira réussi")
  })
})
