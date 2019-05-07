const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var usersSchema = new Schema (
    {
        nameUser: {type: String, required: true},
        lastname:{type:String, required:true},
        age:{type:String, min:18, max:90},
        psudo:{type:String, required:true},
        username:{type:String},
        password: {type:String},
        token: {type:String}
    }
);

usersSchema.virtual('name').get(function(){
    return (this.name + ' ' + this.lastname);
})

usersSchema.virtual('url').get(function(){
    return '/utilisateurs'
})

module.exports = mongoose.model('Utilisateurs', usersSchema);
