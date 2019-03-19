const colUsers  = require('./ModelsUsers');
const processUsers = require('./processUsers');
var jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports={
    
    showUserAction:(req,res)=>{ 
        console.log("ici")
        processUsers.showUserProcess(req.params.id,res);
    },
    
    showAllUsersAction:(req,res)=>{
       processUsers.showAllUsersProcess(res);
    },
    
    deleteUserAction:(req,res)=>{
        processUsers.deleteUserProcess(req.params.id,res);
    },
    
    addUserAction:(req,res)=>{
        var pwd= bcrypt.hashSync(req.body.password, 8);
        // creattion du token
        var tokentoken = jwt.sign({nameUser:req.body.name, lastname:req.body.lastname, age:req.body.age, username:req.body.username}, 'SecretTopSecret');
        console.log('req ', req.body);

        var myUser= new colUsers({
            nameUser: req.body.nameUser,
            lastname: req.body.lastname,
            age: req.body.age,
            username: req.body.username,
            password: pwd,
            token: tokentoken
        });
        processUsers.addUserProcess(myUser,res);
    },

    updateUserAction:(req,res)=>{
        var id = req.params.id
        var pwd= bcrypt.hashSync(req.body.password, 8)
        // creattion du token
        var tokentoken = jwt.sign({nameUser:req.body.name, lastname:req.body.lastname, age:req.body.age, username:req.body.username}, 'SecretTopSecret');

        var myUser= new colUsers({
            nameUser:req.body.name,
            lastname:req.body.lastname,
            age:req.body.age,
            username:req.body.username,
            password: pwd,
            token:tokentoken
        })
        processUsers.updateUserProcess(id,myUser,res)
    },

    authenticateUserAction: (req, res)=>{
        // on a besoin de l'adresse mail et du mot de passe
        processUsers.authenticateUserProcess(req.body.username,req.body.password,res);
    },

    verifTopkenAction: (req, res)=>{
        var token = req.headers ['x-access-token'];
        processUsers.verifTokenProcess(token,res);
    },
}