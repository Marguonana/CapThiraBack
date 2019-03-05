var colImage = require('../models/ImagesModels');
var ObjectId = require('mongodb').ObjectID

module.exports={
    
    afficherUneImage:(id,res)=>{
        colImage.findOne({_id: id},(err, img)=> {
            if (err) {throw err}
            console.log("L'image est : ", img);
            res.end(JSON.stringify(img))         
        });
    },
    
    supprimerImage:(id,res)=>{
        colImage.remove({_id: ObjectId(id)},(err,id)=>{
            if(err){throw err}
            console.log('Image Supprimée !')
        })
    },
    
    AfficherTousLesImages:(res)=>{
        colImage.find((err, img)=> {
            if (err) {throw err}
            console.log("Les images sont : ", img);
            res.end(JSON.stringify(img))         
        });
    },
    
    ajouterImage:(monImg,res)=>{
        monImg.save(function(err){
            if(err){throw err;}
            console.log('Image sauvegardée !')
        })
    },
    
    modifierImage:()=>{
        
    }
}