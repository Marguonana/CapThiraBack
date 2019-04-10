const colImage = require('./modelsImages');
const ObjectId = require('mongodb').ObjectID;
const aws_env= require('../../aws_s3_env');
const aws = require('aws-sdk');

const s3= new aws.S3({
    accessKeyId : aws_env.AWS_ACCESS_KEY,
    secretAccessKey : aws_env.AWS_SECRET_ACCESS_KEY,
    region : aws_env.REGION
});


module.exports={

    addImageProcess:(myImg, bufImg)=>{
        return new Promise((resolve)=>{
            myImg.save(function(err){
                if(err) resolve(400)
                var params={
                    Bucket: aws_env.Bucket,
                    Key: myImg.key,
                    Body: bufImg,  
                    ContentEncoding: 'base64',
                    ContentType: 'image/jpeg'
                };
                console.log(params)
                s3.putObject(params,(err)=>{
                    if (err) console.log("erreur s3")
                });
                return resolve('Image posted !')
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
                        Bucket: aws_env.Bucket,
                        Key: key,
                        Expires: 60 // le temps d'expiration de l'url
                    }
                    var url = s3.getSignedUrl('getObject', params);
                    resolve({img: JSON.stringify(img), url: url });
                }
            });
        })
    },

    showAllImagesProcess:(idUser)=>{
        return new Promise((resolve)=>{
            var listUrl = [];
            colImage.find({idUser : idUser},(err, img)=> {
                if (err) resolve(400)
                else{
                    img.forEach(elment=>{
                        var params = { 
                            Bucket: aws_env.Bucket,
                            Key: elment.key,
                            Expires: 60 // le temps d'expiration de l'url
                        }
                        var url = s3.getSignedUrl('getObject', params);
                        listUrl.push(url);
                    });
                    resolve({imgs: JSON.stringify(img), listUrl: listUrl});
                }
            });
        })
    },

    updateImageProcess:(id,res)=>{
        // à définir 
    },
    
    deleteImageProcess:(id)=>{
        return new Promise((resolve)=>{
            colImage.remove({_id: ObjectId(id)},(err,img)=>{
                if(!img) resolve(404)
                if(err) resolve(400)
                else{
                    var params = {
                        Bucket: aws_env.Bucket, 
                        Key: key
                       };
                    s3.deleteObject(params);
                    resolve('Image deleted.');
                }
            })
        })
    },
    

}