const colImages  = require('../models/ImagesModels');
const processImages = require('./processImages');

module.exports={
    
    showImageAction:(req,res)=>{ 
        processImages.showImageProcess(req.params.id,res);
    },
    
    showAllImagesAction:(req,res)=>{
        processImages.showAllImagesProcess(res);
    },
    
    deleteImageAction:(req,res)=>{
        processImages.deleteImageProcess(req.params.id);
    },
    
    addImageAction:(req,res)=>{
        var bufimg = req.params.code //"le code de l'img base 64"
        var cBufImg = Buffer.from(bufimg, 'base64');
        var monImage= new colImages({
            img :cBufImg,
            titre:"Image-"+ new Date(),
            idUser:"0",
            datePublication:new Date(),
            taille:0
        })
        processImages.addImageProcess(monImage);
        res.send('Image added !')
    },

    updateImageAction:(req,res)=>{
        var id = req.params.id
      //à définir
    },
}
