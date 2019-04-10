const colImages  = require('./modelsImages');
const processImages = require('./processImages');

const generateSafeId = require('generate-safe-id');
const re = /(?:\.([^.]+))?$/;

module.exports={
    
    addImageAction:(req,res)=>{
        var path= req.body.path;
        var myImage= new colImages({
            //Générer un nom unique pour l'image pour ne pas écraser d'autres images dans le cloude 
            key: generateSafeId()+'.'+ re.exec(path)[1],
            title:req.body.title,
            idUser:req.body.idUser,
            datePublication:req.body.date,
            size:req.body.size
        })
        processImages.addImageProcess(myImage,path).then((result)=>{
            if(result==400) res.status(result).send('There was a problem adding the informations to the database.');
            if(result==6000) res.status(result)
            res.status(200).json(result)
        });
    },

    showImageAction:(req,res)=>{ 
        var key = req.body.key;
        var id = req.body.id;
        processImages.showImageProcess(id,key).then((result)=>{
            if(result==404) res.status(result).send("No image found.");
            if(result==400) res.status(result).send("There was a problem finding the image.");
            res.status(200).json(result)
        });
    },
    
    showAllImagesAction:(req,res)=>{
        var idUser = req.body.idUser;
        processImages.showAllImagesProcess(idUser).then((result)=>{
            if(result==400) res.status(result).send("There was a problem finding the image.");
            res.status(200).json(result)
        });
    },

    updateImageAction:(req,res)=>{
      //à définir
    },
    
    deleteImageAction:(req,res)=>{
        var key = req.body.key;
        var id = req.body.id;
        processImages.deleteImageProcess(id,key).then((result)=>{
            if(result==404) res.status(result).send("No image found.");
            if(result==400) res.status(result).send("There was a problem deleting the image.");
            if(result==6000) res.status(result)
            res.status(200).json(result)
            
        });
    },
    

}
