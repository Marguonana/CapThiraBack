const colUsers = require('./ModelsUsers');
const ObjectId = require('mongodb').ObjectID
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports={
    
    addUserProcess:(myUser)=>{  
        return new Promise((resolve,reject)=>{
            //console.log(myUser);
            myUser.save(function(err,user){
                if(err) reject('Error')
                resolve({message:'User posted !', user})
            })
        })
         
    },

    showUserProcess:(id)=>{
        return new Promise((resolve,reject)=>{
            colUsers.findOne({_id: id},(err, user)=> {
                if (!user) reject('Do not found user')
                if (err) reject('Error')
                resolve({user})     
            });
        })
    },

    showAllUsersProcess:()=>{
        return new Promise((resolve,reject)=>{
            colUsers.find((err, user)=> {
                if (err) reject('Error')
                resolve({user})  
            });
        })
        
    },
    
    updateUserProcess:(id,myUser)=>{
        return new Promise((resolve,reject)=>{
            colUsers.findOne({_id: id},(err, user)=> {
                if (!user) reject('Do not found user')
                else
                if (err) reject('Error')
                else{
                    user.nameUser= myUser.nameUser
                    user.lastname= myUser.lastname
                    user.age= myUser.age
                    user.username= myUser.username
                    user.password= myUser.password
                    user.token= myUser.token
                    user.save((err,user)=>{
                        if(err){
                            reject("Error in save methode")
                        }
                        resolve({message:'User Updated !',user})
                    });  
                }    
            });
        })
        
    },
    
    deleteUserProcess:(id)=>{
        return new Promise ((resolve,reject)=>{
            colUsers.deleteOne({_id: (id)},(err,user)=>{
                if(!user) reject("Do not found user")
                else
                if(err) reject("Error")
                else
                resolve({message:'User deleted'})
            })
        })
    },

    authenticateUserProcess: (userName,passWord)=>{
        return new Promise((resolve,reject)=>{
            colUsers.findOne({username: userName}, (err, user)=>{
                if(!user) reject('Do not found user')
                if(err) reject('Server problem')
                
                console.log(user.password +" = "+passWord)
                
                var passwordIsValid= bcrypt.compareSync(passWord,user.password);
                console.log(passwordIsValid)
                if (!passwordIsValid) reject('Invalid password')
                
                resolve({message:'success login',user,auth:true, token: user.token, idMongo: user._id})
            })
        })
       
       
    },

    verifTokenProcess: (token,res)=>{
        return new Promise((resolve,reject)=>{
            if(!token) reject('No token')
       
            jwt.verify(token, 'SecretTopSecret', (err, decode)=>{
                if(err) reject('Server Problem')
               
                colUsers.findOne({token: decode},(err, user)=> {
                    if (!user) reject('Do not found user')
                    if (err) reject('Error')
                    resolve(JSON.stringify(user.token));
                });
            });
        })

    },

    
}
