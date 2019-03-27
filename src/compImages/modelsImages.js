const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

var ImagesSchema = new Schema (
    {
        img: {type: Buffer, required: true},
        titre:{type:String, required:true},
        idUser:{type: ObjectId},
        datePublication: {type:Date, required: true},
        taille: {type:Number, required: true }
    }
);

ImagesSchema.virtual('entete').get(function(){
    return (this.idUser + ' ' + this.title);
})

ImagesSchema.virtual('url').get(function(){
    return '/images'
})

module.exports = mongoose.model('Images', ImagesSchema);
