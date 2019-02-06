var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagesSchema = new Schema (
    {
        img: {type: Buffer, required: true},
        titre:{type:String, required:true},
        idUser:{type:Number},
        datePublication: {type:Date, required: true},
        taille: {type:Number, required: true }
    }
);

ImagesSchema.virtual('entete').get(function(){
    return (this.idUser + ' ' + this.titre);
})

ImagesSchema.virtual('url').get(function(){
    return '/images'
})

module.exports = mongoose.model('Images', ImagesSchema);
