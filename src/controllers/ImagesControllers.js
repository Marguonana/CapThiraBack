/**
 * Controller name: ImagesControllers
 * Model : ImagesModels
 * Utilité : Recuperer, supprimer.... les images visibles sur le profil 
 */

var Images = require('../models/ImagesModels');

/**
 * Creation
 */
exports.post = function(req,res){
    console.log("in: Post request\nreq: ", req);
}

/**
 * Recuperation
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
exports.delete = function (req, res){
    console.log("in: Delete request.\nreq: ",req);
}