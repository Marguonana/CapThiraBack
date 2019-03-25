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
        processUsers.addUserProcess(myUser,res);
    },

    showUserAction:(req,res)=>{ 
        processUsers.showUserProcess(req.params.id,res);
    },
    
    showAllUsersAction:(req,res)=>{
       processUsers.showAllUsersProcess(res);
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
        processUsers.updateUserProcess(id,myUser,res)
    },
    
    deleteUserAction:(req,res)=>{
        processUsers.deleteUserProcess(req.params.id,res);
    },

    authenticateUserAction: (req, res)=>{
        // on a besoin de l'adresse mail et du mot de passe
        var userName = req.body.username;
        var passWord = req.body.password;
        processUsers.authenticateUserProcess(userName,passWord,res);
    },

    verifTopkenAction: (req, res)=>{
        var token = req.headers ['x-access-token'];
        processUsers.verifTokenProcess(token,res);
    },
}
