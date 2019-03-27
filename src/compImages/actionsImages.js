const colImages  = require('./modelsImages');
const processImages = require('./processImages');

// const generateSafeId = require('generate-safe-id');
// const re = /(?:\.([^.]+))?$/;

module.exports={
    
    addImageAction:(req,res)=>{
        var bufImg = req.body.img;
        var cBufImg = Buffer.from(bufImg, 'base64');
        console.log(req.body)
        var myImage= new colImages({
            img: cBufImg,
            titre:req.body.titre,
            idUser:req.body.idUser,
            datePublication:req.body.datePublication,
            taille:req.body.taille
        })
        processImages.addImageProcess(myImage).then((result)=>{
            if(result==400) res.status(result).send('There was a problem adding the informations to the database.');
            if(result==6000) res.status(result)
            res.status(200).send(result)
        });
    },

    showImageAction:(req,res)=>{ 
        var id = req.body.id;
        processImages.showImageProcess(id,key).then((result)=>{
            if(result==404) res.status(result).send("No image found.");
            if(result==400) res.status(result).send("There was a problem finding the image.");
            res.status(200).send(result)
        });
    },
    
    showAllImagesAction:(req,res)=>{
        var idUser = req.params.id;
        processImages.showAllImagesProcess(idUser).then((result)=>{
            if(result==400) res.status(result).send("There was a problem finding the image.");
            res.status(200).send(result)
        });
    },

    updateImageAction:(req,res)=>{
      //à définir
    },
    
    deleteImageAction:(req,res)=>{
        var id = req.params.id;
        console.log(req.params)
        processImages.deleteImageProcess(id).then((result)=>{
            if(result==404) res.status(result).send("No image found.");
            if(result==400) res.status(result).send("There was a problem deleting the image.");
            if(result==6000) res.status(result)
            res.status(200).send(result)
            
        });
    },
    

}
