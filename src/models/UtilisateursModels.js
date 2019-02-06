var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UtilisateursSchema = new Schema (
    {
        idUser: {type:Number},
        nom: {type: String, required: true},
        prenom:{type:String, required:true},
        age:{type:String, min:18, max:90},
        mdp: {type:String}
    }
);

UtilisateursSchema.virtual('name').get(function(){
    return (this.nom + ' ' + this.prenom);
})

UtilisateursSchema.virtual('url').get(function(){
    return '/utilisateurs'
})

module.exports = mongoose.model('Utilisateurs', UtilisateursSchema);
