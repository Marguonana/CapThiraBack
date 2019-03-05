/**
 * Controller name: ImagesControllers
 * Model : ImagesModels
 * Utilit� : Recuperer, supprimer.... les images visibles sur le profil 
 */
var colImages = require('../models/ImagesModels');
var ObjectId = require('mongodb').ObjectID


module.exports={
 /**
 * Creation
 */
  createImage : function(req,res){
      var bufimg = "le code de l'img base 64"
      var toto = Buffer.from(bufimg, 'base64');
      var monImage1= new colImages({
        img :toto,
        titre:"Image1",
        idUser:"1",
        datePublication:new Date(),
        taille:2
      })
    monImage1.save(function(err){
      if(err){throw err;}
      console.log('img ajouté avec success !')
    })
  },
  /**
 * Recuperation
 */
  seeImage: function (req, res) {

    var idImage='5c5c1e65c9e28d175871b9e9'
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
  },
  /**
   * Delete img
   */

  deleteImg:(req,res)=>{
    var id =req.params.id
    colImages.remove({_id: ObjectId(id)},(err,res)=>{
    if(err){throw err}
    console.log('Suppression éfectuée avec succes!')
    })
  },
  /**
   * Update
   */
  modifierImg:(req,res)=>{
    //A définir pour le prochaine MVP
  }
}

