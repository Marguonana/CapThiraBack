const colImage = require('./modelsImages');
const ObjectId = require('mongodb').ObjectID;
const confAWS= require('../../conf_AWS');
const aws = require('aws-sdk');
const fs = require('fs');
const s3= new aws.S3();
const nameBucket= 'capthira-file'


module.exports={

    addImageProcess:(myImg, path, res)=>{
        var params={
            Bucket: nameBucket,
            Body: fs.createReadStream(path),
            Key: myImg.key,
        };
        
        s3.putObject(params,(err)=>{
            if(err) res.status(6000); // a revoir
        });
        
        myImg.save(function(err){
            if(err) return res.status(400).send('There was a problem adding the informations to the database.');
            res.status(200).send('Image posted !')
        })
    },
    
    showImageProcess:(id,key,res)=>{
        colImage.findOne({_id: id},(err, img)=> {
            if (err) return res.status(400).send("There was a problem finding the image.");
            if (!img) return res.status(404).send("No image found.");
            else{
                var params = { 
                    Bucket: nameBucket,
                    Key: key,
                    Expires: 60 // le temps d'expiration de l'url
                }
                var url = s3.getSignedUrl('getObject', params);
            }
            res.status(200).send({img: JSON.stringify(img), s3Url: url});      
        });
    },

    showAllImagesProcess:(idUser ,res)=>{
        var listUrl = [];
        colImage.find({idUser : idUser},(err, img)=> {
            if (err) return res.status(400).send("There was a problem finding the image.");
            img.forEach(elment=>{
                var params = { 
                    Bucket: nameBucket,
                    Key: elment.key,
                    Expires: 60 // le temps d'expiration de l'url
                }
                var url = s3.getSignedUrl('getObject', params);
                listUrl.push(url);
            });
            res.status(200).send({imgs: JSON.stringify(img), listurl: listUrl});
        });
    },

    updateImageProcess:(id,res)=>{
        // à définir 
    },
    
    deleteImageProcess:(id,key,res)=>{
        colImage.remove({_id: ObjectId(id)},(err,img)=>{
            if(err) return res.status(400).send("There was a problem deleting the image.");
            if(!img) return res.status(404).send("No image found.");
            else{
                var params = {
                    Bucket: nameBucket, 
                    Key: key
                   };
                s3.deleteObject(params,(err)=>{
                    if(err) res.status(6000); // a revoir 
                });
                
            }
            res.status(200).send('Image deleted.');
            
        })
    },
    
}