const colUsers = require('./ModelsUsers');
const ObjectId = require('mongodb').ObjectID
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports={
    
    addUserProcess:(myUser,res)=>{
        console.log(myUser);
        myUser.save(function(err,user){
            if(err) return res.status(400).send('There was a problem adding the informations to the database.');
            res.status(200).send('User posted !/n'+ user)
        })
    },

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
    
    updateUserProcess:(id,myUser,res)=>{
        colUsers.findById({_id: ObjectId(id)}, function (err, user) {
            if (err) return res.status(400).send("There was a problem updating the user.");
            if (!user) return res.status(404).send("No User found.")
            user.nameUser= myUser.name
            user.lastname= myUser.lastname
            user.age= myUser.age
            user.username= myUser.username
            user.password= myUser.password
            user.token= myUser.token
            user.save((err)=>{
                if(err){
                    throw err
                }
                res.status(200).send('User Updated !')
            });      
        });
    },
    
    deleteUserProcess:(id,res)=>{
        colUsers.remove({_id: ObjectId(id)},(err,user)=>{
            if(err) return res.status(400).send("There was a problem finding the user.");
            if(!user) return res.status(404).send("No user found.");
            res.status(200).send('User deleted')
        })
    },

    authenticateUserProcess: (userName,passWord, res)=>{
        colUsers.findOne({username: userName}, (err, user)=>{
            if(err) return res.status(500).send(userName);
            if(!user) return res.status(404).send("No user found.");

            var passwordIsValid= bcrypt.compareSync(passWord,user.password);
            if (!passwordIsValid) return res.status(401).send({auth: false, token: null})
            
            res.status(200).send({auth:true, token: user.token})
        })
    },

    verifTokenProcess: (token,res)=>{
        if(!token) return res.status(401).send({auth: false, message:'undefined'});
        
        jwt.verify(token, 'SecretTopSecret', (err, decode)=>{
            if(err) return res.status(500).send({auth: false, message:'undefined'});
            
            colUsers.findOne({token: decode},(err, user)=> {
                if (err) return res.status(400).send({auth: false,message: "undefined err"});
                if (!user) return res.status(404).send({auth: false,message: "undefined, not user"});
                res.status(200).send(JSON.stringify(user.token));
            });
        });
    },
}
