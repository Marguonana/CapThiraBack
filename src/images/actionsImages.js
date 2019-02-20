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
       
        console.log('TEEEEEEEEEEEEEEEEEEEEEEEST ' + JSON.stringify(req.body));
        var bufimg = req.body.img; //"le code de l'img base 64"
        var cBufImg = Buffer.from(bufimg, 'base64');
        var monImage= new colImages({
            img :cBufImg,
            titre:req.body.titre,
            idUser:req.body.idUser,
            datePublication:req.body.datePublication,
            taille:req.body.taille
          })
        processImages.ajouterImage(monImage,res);
        res.send('Image créé !')
    },

    modifierImage:(req,res)=>{
        let id = req.params.id
      //à définir
    },
}
