const mongoose = require('mongoose')

const UrlSchema  =  new mongoose.Schema({
    shortId:{
        type:String,
        unique:true,
        require:true
    },
    redirectUrl:{
        type:String,
        require:true
    },
    visitHistory: [ {timestamp : Number}]
},{timestamps:true})


const Url = mongoose.model("Url",UrlSchema)

module.exports = Url;