const colImages  = require('./modelsImages');
const processImages = require('./processImages');
const generateSafeId = require('generate-safe-id');
const re = /(?:\.([^.]+))?$/;

module.exports={
    
    addImageAction:(req,res)=>{
        var path= req.body.path;
        var myImage= new colImages({
            //Générer un nom unique pour l'image pour ne pas écraser d'autres images dans le cloude 
            key: generateSafeId()+'.'+ re.exec(path)[1],
            title:req.body.title,
            idUser:req.body.idUser,
            datePublication:req.body.date,
            size:req.body.size
        })
        processImages.addImageProcess(myImage,path,res);
    },

    showImageAction:(req,res)=>{ 
        var key = req.body.key;
        var id = req.body.id;
        processImages.showImageProcess(id,key,res);
    },
    
    showAllImagesAction:(req,res)=>{
        var idUser = req.body.idUser;
        processImages.showAllImagesProcess(idUser, res);
    },

    updateImageAction:(req,res)=>{
      //à définir
    },
    
    deleteImageAction:(req,res)=>{
        var key = req.body.key;
        var id = req.body.id;
        processImages.deleteImageProcess(id,key,res);
    },
    
}
