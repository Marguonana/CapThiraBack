const colImages  = require('./modelsImages');
const processImages = require('./processImages');
const processUsers = require('../compUsers/processUsers')
const generateSafeId = require('generate-safe-id');
const re = /(?:\.([^.]+))?$/;

module.exports={

    addImageAction:(req,res)=>{
        var bufImg  = Buffer.from(req.body.img.replace(/^data:image\/\w+;base64,/, ""),'base64');
        var myImage= new colImages({
            //Générer un nom unique pour l'image pour ne pas écraser d'autres images qui sont deja dans le S3
            key: generateSafeId()+'.'+ re.exec(req.body.name)[1],
            title:req.body.titre,
            idUser:req.body.idUser,
            datePublication:req.body.datePublication,
            size:req.body.taille,
            pseudo: req.body.pseudo
        })
        //console.log(myImage);
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

    //updateImageAction:(req,res)=>{
      //à définir
    //},
    
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

    showAllImagesSubscriptionsAction:(req,res)=>{
        processUsers.showUserProcess(req.params.idUser)
        .then((myUser)=>{
            processImages.showAllImagesSubscriptionsProcess(myUser.user.subscribe)
            .then((allImagesSubscribe)=>{
                res.status(200).json(allImagesSubscribe)
            })
            .catch((typeERR)=>{
                res.status(404).json("There was a problem finding the image.")
            })
        })
        .catch((errTypeUser)=>{
            if (errTypeUser==='Do not found user') res.status(404).send('Do not found user')
            if (errTypeUser==='Error') res.status(404).send('Error in your request !')
        })
    },
        
    likeAction: (req, res) =>{
        const user = {idUser : req.body.idUser, pseudo : req.body.pseudo};
        const idImage = req.body.idImage;
        
        processImages.likeProcess(idImage,user)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((errType)=>{
            console.log(errType)
            if(errType=="Do not found image") res.status(404).send("No user found.")
            if(errType=="Error in save methode") res.status(400).send('Error in the save methode')
            if(errType=="Error") res.status(400).send("There was a problem to like this image.")
        })
    },

    showAllLikeAction: (req, res) =>{
        const idImage = req.params.id;

        processImages.showAllLikeProcess(idImage)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((errType)=>{
            console.log(errType)
            if(errType=="Do not found image") res.status(404).send("No image found.")
            if(errType=="Error") res.status(400).send("There was a problem showing likes.")
        })
    },
}