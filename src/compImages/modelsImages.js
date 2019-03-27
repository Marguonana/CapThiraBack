const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImagesSchema = new Schema (
    {
        img: {type: Buffer, required: true},
        titre:{type:String, required:true},
        idUser:{type:Number},
        datePublication: {type:Date, required: true},
        taille: {type:Number, required: true }
    }
);



module.exports = mongoose.model('Images', ImagesSchema);
