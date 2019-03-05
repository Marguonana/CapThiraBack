const colUsers  = require('../models/UtilisateursModels');
const processUsers = require('./processUsers');

module.exports={
    
    showUserAction:(req,res)=>{ 
        processUsers.showUserProcess(req.params.id,res);
    },
    
    showAllUsersAction:(req,res)=>{
       processUsers.showAllUsersProcess(res);
      
    },
    
    deleteUserAction:(req,res)=>{
        processUsers.deleteUserProcess(req.params.id);
    },
    
    addUserAction:(req,res)=>{
        var theUser= new colUsers({
            nom:req.body.name,
            prenom:req.body.lastName,
            age:req.body.age,
            mail:req.body.mail,
            mdp: req.body.passeword
        })
        processUsers.addUserProcess(theUser);
        console.log('User added !')
    },

    updateUserAction:(req,res)=>{
        var id = req.params.id
        var theUser= new colUsers({
            nom:req.body.name,
            prenom:req.body.lastName,
            age:req.body.age,
            mail:req.body.mail,
            mdp: req.body.passeword
        })
        processUsers.updateUserProcess(id,theUser,res)
    },
}
