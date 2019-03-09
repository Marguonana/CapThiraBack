const colUsers = require('./ModelsUsers');
const ObjectId = require('mongodb').ObjectID

module.exports={
    
    showUserProcess:(id,res)=>{
        colUsers.findOne({_id: id},(err, user)=> {
            if (err) return res.status(400).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            res.status(200).send(JSON.stringify(user))    
        });
    },

    showAllUsersProcess:(res)=>{
        colUsers.find((err, user)=> {
            if (err) return res.status(400).send("There was a problem finding the user.");
            res.status(200).send(JSON.stringify(user))  
        });
    },
    
    deleteUserProcess:(id,res)=>{
        colUsers.remove({_id: ObjectId(id)},(err,user)=>{
            if(err) return res.status(400).send("There was a problem finding the user.");
            if(!user) return res.status(404).send("No user found.");
            res.status(200).send('User deleted')
        })
    },
    
    addUserProcess:(myUser,res)=>{
        myUser.save(function(err,user){
            if(err) return res.status(400).send('There was a problem adding the informations to the database.');
            res.status(200).send('User posted !/n'+ user)
        })
    },
    
    updateUserProcess:(id,myUser,res)=>{
        colUsers.findById({_id: ObjectId(id)}, function (err, user) {
            if (err) return res.status(400).send("There was a problem updating the user.");
            if (!user) return res.status(404).send("No User found.")
            user.nameUser=myUser.name
            user.lastname=myUser.lastname
            user.age=myUser.age
            user.username=myUser.username
            user.password=myUser.password
            user.save((err)=>{
                if(err){
                    throw err
                }
                res.status(200).send('User Updated !')
            });      
        });
    }
}
