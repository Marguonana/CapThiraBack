const colUsers = require('../models/UtilisateursModels');
const ObjectId = require('mongodb').ObjectID

module.exports={
    
    showUserProcess:(id,res)=>{
        colUsers.findOne({_id: id},(err, user)=> {
            if (err) {return res.status(404).send("Id user: "+id+" not exist")}
            res.end(JSON.stringify(user))    
        });
    },
    
    deleteUserProcess:(id)=>{
        colUsers.remove({_id: ObjectId(id)},(err,id)=>{
            if(err){throw err}
            console.log('User deleted.')
        })
    },
    
    showAllUsersProcess:(res)=>{
        colUsers.find((err, user)=> {
            if (err) {return res.status(404).send("Id user: "+id+" not exist")}
            res.send(JSON.stringify(user))  
        });
    },
    
    addUserProcess:(monUser)=>{
        monUser.save(function(err){
            if(err){throw err;}
            console.log('User posted !')
        })
    },
    
    updateUserProcess:(id,monUser,res)=>{
        colUsers.findById({_id: ObjectId(id)}, function (err, user) {
            if (err) {
                res.status(500).send("There was a problem updating the user.");
            }
            user.nom=monUser.nom
            user.prenom=monUser.prenom
            user.age=monUser.age
            user.mail=monUser.mail
            user.mdp=monUser.mdp
            user.save((err)=>{
                if(err){
                    throw err
                    //res.send(err);
                }
                console.log('User Updated !')
            });      
        });
    }
}