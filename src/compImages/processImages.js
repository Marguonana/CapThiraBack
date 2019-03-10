const colImage = require('./modelsImages');
const ObjectId = require('mongodb').ObjectID

module.exports={
    
    showImageProcess:(id,res)=>{
        colImage.findOne({_id: id},(err, img)=> {
            if (err) return res.status(400).send("There was a problem finding the image.");
            if (!img) return res.status(404).send("No image found.");
            res.status(200).send(JSON.stringify(img))        
        });
    },

    showAllImagesProcess:(res)=>{
        colImage.find((err, img)=> {
            if (err) return res.status(400).send("There was a problem finding the image.");
            res.status(200).send(JSON.stringify(img))  
        });
    },
    
    deleteImageProcess:(id,res)=>{
        colImage.remove({_id: ObjectId(id)},(err,img)=>{
            if(err) return res.status(400).send("There was a problem deleting the image.");
            if(!img) return res.status(404).send("No image found.");
            res.status(200).send('Image deleted.')
        })
    },
    
    addImageProcess:(myImg,res)=>{
        myImg.save(function(err){
            if(err) return res.status(400).send('There was a problem adding the informations to the database.');
            res.status(200).send('Image posted !')
        })
    },
    
    updateImageProcess:(id,res)=>{
        // à définir 
    }
}