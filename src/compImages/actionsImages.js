const colImages  = require('./modelsImages');
const processImages = require('./processImages');
const processUsers = require('../compUsers/processUsers')
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
        console.log(myImage)
        processImages.addImageProcess(myImage, bufImg)
        .then((result)=>{
            // console.log(status)
            res.status(200).json(result)
        })

        .catch((typeErr)=>{
            if(typeErr==="Erreur du save"){
                res.status(400).json('There was a problem adding the informations to the database.');  
            } 
            if(typeErr==="erreur s3"){
                res.status(500).send('There was problem adding the image to the server S3')
            } 
        })

    },

    showImageAction:(req,res)=>{ 
        var key = req.params.key;
        var id = req.params.idUser;
        processImages.showImageProcess(id,key).then((result)=>{
            res.status(200).json(result)
        })
        .catch((typeErr)=>{
            if(typeErr==="image not found") res.status(404).send("Image not found !");
            if(typeErr==="erreur") res.status(400).send("There was a problem finding the image.");

        })
    },
    
    showAllImagesAction:(req,res)=>{
        var idUser = req.params.idUser;
        console.log(req.params)
        processImages.showAllImagesProcess(idUser)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((typeErr)=>{
            res.status(400).send("There was a problem finding the image.")
        })
    },

    updateImageAction:(req,res)=>{
      //à définir
    },
    
    deleteImageAction:(req,res)=>{
        var key = req.params.key;
        var id = req.params.id;
        console.log(req.params)
        processImages.deleteImageProcess(id,key).then((result)=>{
            res.status(200).send(result)
        })
        .catch((typeErr)=>{
            if(result==='No image found') res.status(404).send("No image found.");
            if(result==='Error') res.status(400).send("There was a problem deleting the image.");
            if(result==='Erreur lors de la suppression') res.status(500).send('Erreur lors de la suppression')
        })
    },

    showAllImagesSubscribersAction:(req,res)=>{
        let myUser;
        idUser= req.params.idUser;
        processUsers.showUserProcess(idUser)
        .then((theUser)=>{
            console.log(theUser.user.listAbbo)
            processImages.showAllImagesSubscribersProcess(theUser.user.listAbbo)
            .then((allImages)=>{
                res.status(200).json(allImages)
            })
            .catch((typeERR)=>{
                console.log(typeERR)
            })
        })
        .catch((typeErsr)=>{
            if (typeErr==='Do not found user') res.status(404).send('Do not found user')
            if (typeErr==='Error') res.status(404).send('Error in your request !')
        })
    }
    

}
