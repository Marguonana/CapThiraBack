const colImages  = require('./modelsImages');
const processImages = require('./processImages');

module.exports={
    
    showImageAction:(req,res)=>{ 
        processImages.showImageProcess(req.params.id,res);
    },
    
    showAllImagesAction:(res)=>{
        processImages.showAllImagesProcess(res);
    },
    
    deleteImageAction:(req,res)=>{
        processImages.deleteImageProcess(req.params.id,res);
    },
    
    addImageAction:(res)=>{
        var bufimg = req.body.code
        var cBufImg = Buffer.from(bufimg, 'base64');
        var myImage= new colImages({
            img :cBufImg,
            title:req.body.title,
            idUser:req.body.IDUser,
            datePublication:req.body.date,
            size:req.body.size
        })
        processImages.addImageProcess(myImage,res);
    },

    updateImageAction:(req,res)=>{
        var id = req.params.id
      //à définir
    },
}
