/**
 * Controller name: ImagesControllers
 * Model : ImagesModels
 * Utilité : Recuperer, supprimer.... les images visibles sur le profil 
 */
var colImages = require('../models/ImagesModels');

module.exports={
  /**
 * Creation
 */
  createImage : function(req,res){
      var bufimg = "img baseq64"
      var toto = Buffer.from(bufimg, 'base64');
      var monImage1= new colImages({
        img :toto,
        titre:"Image1",
        idUser:"1",
        datePublication:new Date(),
        taille:2
      })
      console.log("trying...")
    monImage1.save(function(err){
      if(err){throw err;}
      console.log('img ajouté avec success !')
    })
  },
  /**
 * Recuperation
 */
  seeImage: function (req, res) {
    var idImage='5c5f4661fc5ddc3484638ae5'
    //colImages.findOne({_id: req.id}, function (err, image) {
      colImages.find({}, function (err, image) {
      if (err) {
        res.status(504);
        res.end(err);
      } else {
        res.status(200);
         console.log('image get : ', image);
         res.send(image)
         return image;
      }
    });
  }
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
