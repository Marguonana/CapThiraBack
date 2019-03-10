const colUsers  = require('./ModelsUsers');
const processUsers = require('./processUsers');

module.exports={
    
    showUserAction:(req,res)=>{ 
        processUsers.showUserProcess(req.params.id,res);
    },
    
    showAllUsersAction:(req,res)=>{
       processUsers.showAllUsersProcess(res);
    },
    
    deleteUserAction:(req,res)=>{
        processUsers.deleteUserProcess(req.params.id,res);
    },
    
    addUserAction:(req,res)=>{
        var myUser= new colUsers({
            nameUser:req.body.nameUser,
            lastname:req.body.lastname,
            age:req.body.age,
            username:req.body.username,
            password: req.body.password,
            token:''
        })
        processUsers.addUserProcess(myUser,res);
    },

    updateUserAction:(req,res)=>{
        var id = req.params.id
        var myUser= new colUsers({
            nameUser:req.body.name,
            lastname:req.body.lastname,
            age:req.body.age,
            username:req.body.username,
            password: req.body.password,
            token:''
        })
        processUsers.updateUserProcess(id,myUser,res)
    },
}