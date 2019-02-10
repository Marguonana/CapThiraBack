const express = require('express');
const app = express();
var mongoose = require('mongoose');
var hostname = 'localhost';
var port = 3000;
var mongoDB = 'mongodb://localhost:27017/dbCapThira';
var Utilisateurs = require('./src/models/UtilisateursModels');
var colImages = require('./src/models/ImagesModels');
var UtilisateursController = require('./src/controllers/UtilisateursControllers');
var ImagesController = require('./src/controllers/ImagesControllers');

app.post('/',ImagesController.createImage)
app.get('/',ImagesController.seeImage)

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