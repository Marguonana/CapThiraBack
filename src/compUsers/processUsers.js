const colUsers = require('./ModelsUsers');
const ObjectId = require('mongodb').ObjectID
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports={
    
    addUserProcess:(myUser)=>{  
        return new Promise((resolve)=>{
            console.log(myUser);
            myUser.save(function(err,user){
                if(err) resolve(400);
                resolve('User posted !/n'+ user)
            })
        })
         
    },

    showUserProcess:(id)=>{
        return new Promise((resolve)=>{
            colUsers.findOne({_id: id},(err, user)=> {
                if (!user) resolve(404)
                if (err) resolve(400)
                resolve(JSON.stringify(user))    
            });
        })
    },

    showAllUsersProcess:()=>{
        return new Promise((resolve)=>{
            colUsers.find((err, user)=> {
                if (err) resolve(400)
                resolve(JSON.stringify(user))  
            });
        })
        
    },
    
    updateUserProcess:(id,myUser)=>{
        return new Promise((resolve)=>{
            colUsers.findById({_id: ObjectId(id)}, function (err, user) {
                if (!user) resolve(404)
                if (err) resolve(400)
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
                    resolve('User Updated !')
                });      
            });
        })
        
    },
    
    deleteUserProcess:(id)=>{
        return new Promise ((resolve)=>{
            colUsers.remove({_id: ObjectId(id)},(err,user)=>{
                if(!user) resolve(404)
                if(err) resolve(400)
                resolve('User deleted')
            })
        })
    },

    authenticateUserProcess: (userName,passWord)=>{
        return new Promise((resolve)=>{
            colUsers.findOne({username: userName}, (err, user)=>{
                if(!user) resolve(404)
                if(err) resolve(500)
                
    
                var passwordIsValid= bcrypt.compareSync(passWord,user.password);
                if (!passwordIsValid) resolve(401)
                
                resolve({auth:true, token: user.token})
            })
        })
        
       
    },

    verifTokenProcess: (token,res)=>{
        return new Promise((resolve)=>{
            if(!token) resolve(401)
        
            jwt.verify(token, 'SecretTopSecret', (err, decode)=>{
                if(err) resolve(500)
                
                colUsers.findOne({token: decode},(err, user)=> {
                    if (err) resolve(400)
                    if (!user) resolve(404)
                    resolve(JSON.stringify(user.token));
                });
            });
        })
    },
}
