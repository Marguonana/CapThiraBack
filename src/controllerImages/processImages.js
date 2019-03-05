const colImage = require('../models/ImagesModels');
const ObjectId = require('mongodb').ObjectID

module.exports={
    
    showImageProcess:(id,res)=>{
        colImage.findOne({_id: id},(err, img)=> {
            if (err) {throw err}
            res.end(JSON.stringify(img))         
            
        });
    },
    
    deleteImageProcess:(id)=>{
        colImage.remove({_id: ObjectId(id)},(err,id)=>{
            if(err){throw err}
            console.log('Image deleted.')
        })
    },
    
    showAllImagesProcess:(res)=>{
        colImage.find((err, img)=> {
            if (err) {throw err}
            res.send(JSON.stringify(img))  
        });
    },
    
    addImageProcess:(monImg)=>{
        monImg.save(function(err){
            if(err){throw err;}
            console.log('Image posted !')
        })
    },
    
    updateImageProcess:()=>{
        
    }
}