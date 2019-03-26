const colUsers  = require('./ModelsUsers');
const processUsers = require('./processUsers');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports={
    
    addUserAction:(req,res)=>{
        var pwd= bcrypt.hashSync(req.body.password, 8);
        // creattion du token
        var tkn = jwt.sign({nameUser:req.body.name, lastname:req.body.lastname, age:req.body.age, username:req.body.username}, 'SecretTopSecret');

        var myUser= new colUsers({
            nameUser: req.body.nameUser,
            lastname: req.body.lastname,
            age: req.body.age,
            username: req.body.username,
            password: pwd,
            token: tkn
        });
        processUsers.addUserProcess(myUser).then((result)=>{
            if(result==400) res.status(result).send('There was a problem adding the informations to the database.')
            res.status(200).send(result)
        });
    },

    showUserAction:(req,res)=>{ 
        processUsers.showUserProcess(req.params.id).then((result)=>{
            if(result==404) res.status(result).send("No user found.")
            if(result==400) res.status(result).send("There was a problem finding the user.");
            res.status(200).send(result)
        });
    },
    
    showAllUsersAction:(req,res)=>{
       processUsers.showAllUsersProcess().then((result)=>{
           if(result==400) res.status(result).send("There was a problem finding the user.")
           res.status(200).send(result)
       });
    },

    updateUserAction:(req,res)=>{
        var id = req.params.id
        var pwd= bcrypt.hashSync(req.body.password, 8)
        // creattion du token
        var tkn = jwt.sign({nameUser:req.body.name, lastname:req.body.lastname, age:req.body.age, username:req.body.username}, 'SecretTopSecret');

        var myUser= new colUsers({
            nameUser:req.body.name,
            lastname:req.body.lastname,
            age:req.body.age,
            username:req.body.username,
            password: pwd,
            token:tkn
        })
        processUsers.updateUserProcess(id,myUser).then((result)=>{
            if (result==404) res.status(result).send("No User found.")
            if (result==400) res.status(result).send("There was a problem updating the user.")
            res.status(200).send(result)
        })
    },
    
    deleteUserAction:(req,res)=>{
        processUsers.deleteUserProcess(req.params.id).then((result)=>{
            if (result==404) res.status(result).send("No User found.")
            if (result==400) res.status(result).send("There was a problem deleting the user.")
            res.status(200).send(result)
        })
    },

    authenticateUserAction: (req, res)=>{
        // on a besoin de l'adresse mail et du mot de passe
        var userName = req.params.username;
        var passWord = req.params.password;
        processUsers.authenticateUserProcess(userName,passWord).then((result)=>{
            if (result==404) res.status(result).send("No user found.");
            if (result==500) res.status(result).send(userName);
            if (result==401) res.status(result).send({auth: false, token: null})
            res.status(200).send(result)
        });
    },

    verifTopkenAction: (req, res)=>{
        var token = req.headers ['x-access-token'];
        processUsers.verifTokenProcess(token).then((result)=>{
            if (result==401) res.status(result).send({auth: false, message:'undefined'});
            if (result==500) res.status(result).send({auth: false, message:'undefined'});
            if (result==400) res.status(result).send({auth: false,message: "undefined err"});
            if (result==404) res.status(result).send({auth: false,message: "undefined, not user"});
            res.status(200).send(result)
        })
    },
}
