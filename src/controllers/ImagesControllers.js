/**
 * Controller name: ImagesControllers
 * Model : ImagesModels
 * Utilité : Recuperer, supprimer.... les images visibles sur le profil 
 */
var colImages = require('../models/ImagesModels');

/**
 * Creation
 */
exports.post = function(req,res){

    var buffer = Buffer.from(req.b64string, 'base64')
    console.log("in: Post request\nreq: ", req);
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error',console.error.bind(console, 'erreur de connection à mongodb'));
    db.once('open', function(){
        console.log("Connexion à dbCapThira réussi")
    });
    var monImage = new Image({img: buffer,titre: req.title, idUser: req.id, datePublication: new Date(), taille: '1'})
    monImage.save(function(err){
    if(err){throw err;}
    console.log('Image ajouté avec success !')
  })
}

/**
 * Recuperation
 */
exports.get = function (req, res) {
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