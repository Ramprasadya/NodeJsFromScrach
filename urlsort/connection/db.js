const mongoose =require('mongoose')

async function connectToDb(url){
  mongoose.connect(url).then(()=>console.log("connection success"))
}

module.exports = {connectToDb}