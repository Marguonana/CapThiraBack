const colImage = require('./modelsImages');
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectID;
// const confAWS= require('../../conf_AWS');
// const aws = require('aws-sdk');
// const fs = require('fs');
// const s3= new aws.S3();
// const nameBucket= 'capthira-file'


module.exports={

    addImageProcess:(myImg)=>{
        return new Promise((resolve)=>{
            myImg.save(function(err){
                if(err) resolve(400)
                console.log(myImg)
                resolve('Image posted !')
            })  
        })
    },
    
    showImageProcess:(id)=>{
        return new Promise((resolve)=>{
            colImage.findOne({_id: id},(err, img)=> {
                if (!img) resolve(400)
                resolve({img: JSON.stringify(img)});      
            });
        })
    },

    showAllImagesProcess:(idUser)=>{
        return new Promise((resolve)=>{
            console.log(idUser)
            var id = mongoose.Types.ObjectId(idUser);
            colImage.find({idUser : id},(err, img)=> {
                if (err) resolve(400)
                resolve({imgs: JSON.stringify(img)});
            });
        })
    },

    updateImageProcess:(id,res)=>{
        // à définir 
    },
    
    deleteImageProcess:(id)=>{
        return new Promise((resolve)=>{
            var idO = mongoose.Types.ObjectId(id);
            colImage.remove({_id: idO},(err,img)=>{
                if(!img) resolve(400)
                resolve('Image deleted.');
                
            })
        })
    },
    

}