/**
 * Controller name: UtilisateursControllers
 * Model : UtilisateursModels
 * Utilité : exporter les methodes post ; get ; put ; delete
 */

var Images = require('../models/UtilisateursModels');


module.exports={
    /**
 * Creation
 */
    createUser: function(req,res){
        var monUtilisateur = new Utilisateurs({nom: 'Nana',prenom: 'Marguerite', age:'22'})
        monUtilisateur.save(function(err){
            if(err){throw err;}
            console.log('Utilisateur ajouté avec success !')
        })
    }
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