const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/dbCapThira';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error',console.error.bind(console, 'Login error to the database'));  
db.once('open', function(){
    console.log("Successful connection to the database !")
})