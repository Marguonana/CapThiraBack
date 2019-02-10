const express = require('express');
const app = express();
var mongoose = require('mongoose');
var hostname = 'localhost';
var port = 3000;
var mongoDB = 'mongodb://localhost:27017/dbCapThira';
//var Utilisateurs = require('./src/models/UtilisateursModels');
var colImages = require('./src/models/ImagesModels');
//var UtilisateursController = require('./src/controllers/UtilisateursControllers');
var ImagesController = require('./src/controllers/ImagesControllers');

app.get('/', function(req,res){
  console.log('hello world!!')
})

app.listen(port,function (req, res) {
  console.log('CapThira est en écoute au port 3000!');
    mongoose.connect(mongoDB);
      mongoose.Promise = global.Promise;
      var db = mongoose.connection;
      db.on('error',console.error.bind(console, 'erreur de connection à mongodb'));
      db.once('open', function(){
          console.log("Connexion à CapThira réussi")});
      var idImage='5c5f4661fc5ddc3484638ae5'
      //colImages.findOne({_id: req.id}, function (err, image) {
      colImages.findOne({_id: idImage}, function (err, image) {
      if (err) {
        res.status(504);
        res.end(err);
      } else {
        console.log('image : ', image);
        res.end(JSON.stringify(image))
      }
    });
})