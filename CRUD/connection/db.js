const mongoose = require('mongoose');

const ConnectToMongo =()=>{
    mongoose.connect("mongodb://localhost:27017/CRUD").then(()=>{
        console.log("Connection with mongoose success...")
    }).catch((err)=>{
        console.log(err);
        
    })
} 

module.exports = ConnectToMongo;