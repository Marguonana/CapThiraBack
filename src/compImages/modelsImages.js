const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImagesSchema = new Schema (
    {
        key: {type:String, required: true},
        title:{type:String, required:true},
        idUser:{type:Number},
        datePublication: {type:Date, required: true},
        size: {type:Number, required: true }
    }
);

ImagesSchema.virtual('entete').get(function(){
    return (this.idUser + ' ' + this.title);
})

ImagesSchema.virtual('url').get(function(){
    return '/images'
})

module.exports = mongoose.model('Images', ImagesSchema);
