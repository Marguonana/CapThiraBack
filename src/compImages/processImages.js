const colImage = require('./modelsImages');

const ObjectId = require('mongodb').ObjectID;
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
                console.log(myImg);
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
            colImage.find({idUser : idUser},(err, img)=> {
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
            colImage.remove({_id: ObjectId(id)},(err,img)=>{
                if(!img) resolve(400)
                resolve('Image deleted.');
                
            })
        })
    },
    

}