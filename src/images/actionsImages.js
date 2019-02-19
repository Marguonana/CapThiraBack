let colImages  = require('../models/ImagesModels');
let processImages = require('./processImages');

module.exports={
    
    AfficherUneImage:(req,res)=>{
         let id = req.params.id
         processImages.afficherUneImage(id,res);
    },
    
    afficherTousLesImages:(res)=>{
        processImages.AfficherTousLesImages(res);
    },
    
    supprimerImage:(req,res)=>{
        let id = req.params.id
        processImages.supprimerImage(id,res);
    },
    
    AjouterImage:(req,res)=>{
        var bufimg = req.params.code //"le code de l'img base 64"
        var cBufImg = Buffer.from(bufimg, 'base64');
        var monImage= new colImages({
            img :cBufImg,
            titre:"Image-"+ new Date(),
            idUser:"0",
            datePublication:new Date(),
            taille:0
          })
        processImages.ajouterImage(monImage,res);
        res.send('Image créé !')
    },

    modifierImage:(req,res)=>{
        let id = req.params.id
      //à définir
    },
}
