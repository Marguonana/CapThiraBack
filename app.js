const express = require('express');
const app = express();
var mongoose = require('mongoose');
var hostname = 'localhost';
var port = 3000;
var mongoDB = 'mongodb://localhost:27017/dbCapThira';
var Utilisateurs = require('./src/models/UtilisateursModels');


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('CapThira est en écoute au port 3000!');
  mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error',console.error.bind(console, 'erreur de connection à mongodb'));
    db.once('open', function(){
        console.log("Connexion à CapThira réussi")
    });
    var monUtilisateur = new Utilisateurs({nom: 'Nana',prenom: 'Marguerite', age:'22'})
    monUtilisateur.save(function(err){
    if(err){throw err;}
    console.log('Utilisateur ajouté avec success !')
  })
})