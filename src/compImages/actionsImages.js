const colImages  = require('./modelsImages');
const processImages = require('./processImages');

// const generateSafeId = require('generate-safe-id');
// const re = /(?:\.([^.]+))?$/;

module.exports={
    
    addImageAction:(req,res)=>{
        var myImage= new colImages({
            img: req.body.img,
            titre:req.body.titre,
            idUser:req.body.idUser,
            datePublication:req.body.date,
            taille:req.body.taille
        })
        processImages.addImageProcess(myImage,path).then((result)=>{
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
        var idUser = req.params.idUser;
        console.log(req.params)
        processImages.showAllImagesProcess(idUser).then((result)=>{
            if(result==400) res.status(result).send("There was a problem finding the image.");
            console.log(result)
            res.status(200).send(result)
        });
    },

    updateImageAction:(req,res)=>{
      //à définir
    },
    
    deleteImageAction:(req,res)=>{
        var id = req.body.id;
        processImages.deleteImageProcess(id,key).then((result)=>{
            if(result==404) res.status(result).send("No image found.");
            if(result==400) res.status(result).send("There was a problem deleting the image.");
            if(result==6000) res.status(result)
            res.status(200).send(result)
            
        });
    },
    

}
