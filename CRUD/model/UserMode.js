const mongoose = require('mongoose')


const UserSchema = new  mongoose.Schema({
   name:{
    require:true,
    type :String
   },
   email:{
    require:true,
    type :String
   },
   password:{
    require:true,
    type :String
   }
   
},{timestamps:true})


const User = mongoose.model("User",UserSchema)

module.exports = User;