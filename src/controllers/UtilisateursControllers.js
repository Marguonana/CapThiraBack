/**
 * Controller name: UtilisateursControllers
 * Model : UtilisateursModels
 * Utilité : exporter les methodes post ; get ; put ; delete
 */

var Images = require('../models/UtilisateursModels');

/**
 * Creation
 */
exports.post = function(req,res){
    console.log("in: Post request\nreq: ", req);
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
}

/**
 * Recupération
 */
exports.get = function(req,res){
    console.log("in: Get request.\nreq: ",req);
}

/**
 * Modification
 */
exports.put = function (req, res){
    console.log("in: Put request.\nreq: ",req);
}

/**
 * Suppression
 */
exports.delete = function(req,res){
    console.log("in: Delete request.\nreq: ",req)
}