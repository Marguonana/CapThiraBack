const colImage = require('./modelsImages');

const ObjectId = require('mongodb').ObjectID;
const confAWS= require('../../conf_AWS');
const aws = require('aws-sdk');
const fs = require('fs');
const s3= new aws.S3();
const nameBucket= 'capthira-file'


module.exports={

    addImageProcess:(myImg, path)=>{
        return new Promise((resolve)=>{
            var params={
                Bucket: nameBucket,
                Body: fs.createReadStream(path),
                Key: myImg.key,
            };
            
            s3.putObject(params,(err)=>{
                if(err) resolve(6000) // a revoir
            });
            
            myImg.save(function(err){
                if(err) resolve(400)
                resolve('Image posted !')
            })
        })
    },
    
    showImageProcess:(id,key)=>{
        return new Promise((resolve)=>{
            colImage.findOne({_id: id},(err, img)=> {
                if (!img) resolve(404)
                if (err) resolve(400)
                else{
                    var params = { 
                        Bucket: nameBucket,
                        Key: key,
                        Expires: 60 // le temps d'expiration de l'url
                    }
                    var url = s3.getSignedUrl('getObject', params);
                }
                resolve({img: JSON.stringify(img), s3Url: url});      
            });
        })
    },

    showAllImagesProcess:(idUser)=>{
        return new Promise((resolve)=>{
            var listUrl = [];
            colImage.find({idUser : idUser},(err, img)=> {
                if (err) resolve(400)
                img.forEach(elment=>{
                    var params = { 
                        Bucket: nameBucket,
                        Key: elment.key,
                        Expires: 60 // le temps d'expiration de l'url
                    }
                    var url = s3.getSignedUrl('getObject', params);
                    listUrl.push(url);
                });
                resolve({imgs: JSON.stringify(img), listurl: listUrl});
            });
        })
    },

    updateImageProcess:(id,res)=>{
        // à définir 
    },
    
    deleteImageProcess:(id,key)=>{
        return new Promise((resolve)=>{
            colImage.remove({_id: ObjectId(id)},(err,img)=>{
                if(!img) resolve(404)
                if(err) resolve(400)
                else{
                    var params = {
                        Bucket: nameBucket, 
                        Key: key
                       };
                    s3.deleteObject(params,(err)=>{
                        if(err) resolve(6000); // a revoir 
                    });
                    
                }
                resolve('Image deleted.');
                
            })
        })
    },
    

}