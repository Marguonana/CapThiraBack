const colImages  = require('./modelsImages');
const processImages = require('./processImages');
const generateSafeId = require('generate-safe-id');
const re = /(?:\.([^.]+))?$/;

module.exports={
    
    addImageAction:(req,res)=>{
        var bufImg  = Buffer.from(req.body.img.replace(/^data:image\/\w+;base64,/, ""),'base64');
        var myImage= new colImages({
            //Générer un nom unique pour l'image pour ne pas écraser d'autres images 
            key: generateSafeId()+'.'+ re.exec(req.body.name)[1],
            title:req.body.titre,
            idUser:req.body.idUser,
            datePublication:req.body.datePublication,
            size:req.body.taille
        })
        processImages.addImageProcess(myImage, bufImg).then((status)=>{
            console.log(status)
            if(status==400) return res.status(status).send('There was a problem adding the informations to the database.');
            if(status==6000) return res.status(status)
            return res.status(status)
        });
    },

    showImageAction:(req,res)=>{ 
        var key = req.params.key;
        var id = req.params.id;
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
            res.status(200).send(result)
        });
    },

    updateImageAction:(req,res)=>{
      //à définir
    },
    
    deleteImageAction:(req,res)=>{
        var key = req.params.key;
        var id = req.params.id;
        console.log(req.params)
        processImages.deleteImageProcess(id,key).then((result)=>{
            if(result==404) res.status(result).send("No image found.");
            if(result==400) res.status(result).send("There was a problem deleting the image.");
            if(result==6000) res.status(result)
            res.status(200).send(result)
            
        });
    },
    

}
