const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/dbCapThira';


module.exports={
    Connection:()=>{
        if (process.env.NODE_ENV==='test'){
            const Mockgoose = require('mockgoose').Mockgoose
            const mockgoose=new Mockgoose(mongoose)
            mockgoose.prepareStorage()
            .then(()=>{
                mongoose.connect(mongoDB);
                mongoose.Promise = global.Promise;
                const db = mongoose.connection;
            
                db.on('error',console.error.bind(console, 'Login error to the database'));  
                db.once('open', function(){
                    console.log("Successful connection to the database !")
                })
            })
        }else{ 
            mongoose.connect(mongoDB);
            mongoose.Promise = global.Promise;
            const db = mongoose.connection;
        
            db.on('error',console.error.bind(console, 'Login error to the database'));  
            db.once('open', function(){
                console.log("Successful connection to the database !")
            })
        }
    }
}