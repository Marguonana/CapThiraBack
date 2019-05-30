const colImage = require('./modelsImages');
const mongoose= require('mongoose')
const ObjectId = require('mongodb').ObjectID;
const aws_env= require('../../aws_s3_env');
const aws = require('aws-sdk');
const async=require('async')
mongoose.Promise=global.Promise

const s3= new aws.S3({
    accessKeyId : aws_env.AWS_ACCESS_KEY,
    secretAccessKey : aws_env.AWS_SECRET_ACCESS_KEY,
    region : aws_env.REGION
});



module.exports={

    addImageProcess:(myImg, bufImg)=>{
        return new Promise((resolve,reject)=>{
            myImg.save(function(err,img){
                if(err) {
                    reject("Erreur du save");
                }else{
                    let params={
                        Bucket: aws_env.Bucket,
                        Key: myImg.key,
                        Body: bufImg,  
                        ContentEncoding: 'base64',
                        ContentType: 'image/jpeg'
                    };
                    console.log(params)
                    s3.putObject(params,(err)=>{
                        if (err) {
                            reject("erreur s3")
                        }
                    });
                    return resolve({message:'Image posted !'})
                }
            })  
        })
    },
    
    showImageProcess:(id,key)=>{
        return new Promise((resolve,reject)=>{
            colImage.findOne({idUser: id},(err, img)=> {
                if (!img){
                     reject("image not found")
                }else{
                    if (err){
                        reject("erreur")
                    }else{
                        let params = { 
                            Bucket: aws_env.Bucket,
                            Key: key,
                            Expires: 60 // le temps d'expiration de l'url
                        }
                        let url = s3.getSignedUrl('getObject', params);
                        resolve({message: "One image !",img: JSON.stringify(img), url: url });
                    }
                }
                    
            });
        })
    },

    showAllImagesProcess:(idUser)=>{
        return new Promise((resolve,reject)=>{
            let listUrl = [];
            colImage.find({idUser : idUser},(err, img)=> {
                if(err){
                    reject('Error')
                }else{
                    img.forEach(elment=>{
                        let params = { 
                            Bucket: aws_env.Bucket,
                            Key: elment.key,
                            Expires: 60 // le temps d'expiration de l'url
                        }
                        let url = s3.getSignedUrl('getObject', params);
                        listUrl.push(url);
                    });
                    resolve({message: "All images !",imgs: JSON.stringify(img), listUrl: listUrl});
                }
            });
        })
    },

    updateImageProcess:(id,res)=>{
        // à définir 
    },
    
    deleteImageProcess:(id,key)=>{
        return new Promise((resolve,reject)=>{
            colImage.deleteOne({key: key},(err,img)=>{
                try{
                    console.log(id)
                    if(!img){
                        reject('No image found')  
                    }else{
                        if(err){
                            reject('Error')
                        }else{
                            let params = {
                                Bucket: aws_env.Bucket, 
                                Key: key
                            };
                            s3.deleteObject(params);
                            resolve({message:'Image deleted.'});
                        }
                    } 
                }catch(err){
                    reject('Erreur lors de la suppression')
                }
               
            })
        })
    },
    
    showAllImagesSubscribersProcess:(myListUser)=>{
        return new Promise((resolve,reject)=>{
            let listUrl = []
            let listImages=[];
            callbackSubscriberImage(myListUser)
            .then( (res) => {
                resolve({message: "subscriber images !",listImgs: res.Img, listUrl: res.urls});
            })
            .catch( errCallBack => {
                reject(errCallBack);
            })
        })
    }

}

callbackSubscriberImage = (myListUsers) => {    
    return new Promise((resolve, reject)=>{
        let listImages=[];
        let listURLs=[];

        myListUsers.forEach( (idUser,index) => {
            colImage.find({idUser:idUser})
            .exec()
            .then((img)=>{
                img.forEach((elment)=>{
                    let params = { 
                        Bucket: aws_env.Bucket,
                        Key: elment.key,
                        Expires: 60 
                        }
                    let url = s3.getSignedUrl('getObject', params);
                    listURLs= listURLs.concat(url);
                })
                listImages.push(img);
                if (index == myListUsers.length-1){
                    resolve({Img:listImages,urls:listURLs});
                }
            })
            .catch((errTypeFindMongoose)=>{
                reject('Error 404');
            })
        })               
        
    })  

}

