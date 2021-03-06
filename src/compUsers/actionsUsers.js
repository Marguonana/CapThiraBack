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
            pseudo:req.body.pseudo.toLowerCase(),
            username: req.body.username,
            password: pwd,
            subscribe: [],
            subscriber: [],
            token: tkn
        });
        processUsers.addUserProcess(myUser)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(400).send('There was a problem adding the informations to the database.')
        })

    },

    showUserAction:(req,res)=>{ 
        processUsers.showUserProcess(req.params.id)
       .then((result)=>{
            res.status(200).json(result)
       })
       .catch((errType)=> {
            if(errType==="Do not found user") res.status(404).send("No user found.")
            if(errType==="Error") res.status(400).send("There was a problem finding the user.")
        });
       
    },
    
    showAllUsersAction:(req,res)=>{ 
        pseudo=req.params.pseudo
        processUsers.showAllUsersProcess(pseudo)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).send('There was a problem adding the informations to the database.')
        })
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
            pseudo:req.body.pseudo,
            username:req.body.username,
            password: pwd,
            token:tkn
        })

        processUsers.updateUserProcess(id,myUser)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((errType)=>{
            console.log(errType)
            if(errType=="Do not found user") res.status(404).send("No user found.")
            if(errType=="Error in save methode") res.status(400).send('Error in the save methode')
            if(errType=="Error") res.status(400).send("There was a problem updating the user.")
        })
    },
    
    deleteUserAction:(req,res)=>{
        processUsers.deleteUserProcess(req.params.id)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err) => {
            if(err==="Do not found user") res.status(404).send("No user found.")
            if(err==="Error") res.status(400).send("There was a problem deleting the user.")
        })

    },

    authenticateUserAction: (req, res)=>{
        // on a besoin de l'adresse mail et du mot de passe

        var userName = req.params.username;
        var passWord = req.params.password;
        processUsers.authenticateUserProcess(userName,passWord)
        .then((result)=>{
            res.status(200).send(result)
        })

        .catch((err)=>{
            if(err==="Do not found user") res.status(404).send("No user found.")
            if(err==='Server problem') res.status(500).send("Server error.")
            if(err==='Invalid password') res.status(401).send('Invalid password')
        })

    },

    // shearchUsersActions:(req,res)=>{
    //     let strSearch=req.params.strSearch;
    //     processUsers.shearchUsersProcess(strSearch)
    //     .then((result)=>{
            
    //     })

    //     .catch((typeErr)=>{
            
    //     })
    // },

    verifTopkenAction: (req, res)=>{
        var token = req.headers ['x-access-token'];

        processUsers.verifTokenProcess(token)
        .then((result)=>{
            res.status(200).send(result)
        })

        .catch((err)=>{
            if(err==='No token') res.status(404).send("token not found.")
            if(err==='Server Problem') res.status(500).send("Server error.")
            if(err==='Do not found user') res.status(404).send('No user found.')
            if(err==='Error') res.status(400).send("There was a problem deleting the user.")
        })

    },

    subscribeAction: (req, res) =>{
        const subscription = {idSubscription : req.body.idSubscription, pseudoSubscription : req.body.pseudoSubscription};
        const idSubscriber = req.body.idSubscriber;
        const pseudoSubscriber = req.body.pseudoSubscriber;
        
        processUsers.subscribeProcess(idSubscriber,subscription,pseudoSubscriber)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((errType)=>{
            console.log(errType)
            if(errType=="Do not found user") res.status(404).send("No user found.")
            if(errType=="Error in save methode") res.status(400).send('Error in the save methode')
            if(errType=="Error") res.status(400).send("There was a problem adding the subscriber.")
        })
    },

    showAllSubscriptionsAction: (req, res) =>{
        const idUser = req.params.id;
        processUsers.showAllSubscriptionsProcess(idUser)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((errType)=>{
            console.log(errType)
            if(errType=="Do not found user") res.status(404).send("No user found.")
            if(errType=="Error") res.status(400).send("There was a problem showing the subscriber.")
        })
    }
}
