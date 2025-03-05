const express = require('express')
const app = express()
const port = 8080
const urlRoutes = require("./routes/url")
const {connectToDb} = require("./connection/db")
const Url = require('./models/Url')


connectToDb("mongodb://localhost:27017/shortUrl")
app.use(express.json())
app.use("/url",urlRoutes)

app.get("/url/:shortId",async(req,res)=>{
  let shortId = req.params.shortId
    let entry = await Url.findOneAndUpdate(
      {
        shortId
      },
      {
        $push:{
          visitHistory:{ 
            timestamp:Date.now()
          }
        }
      }
    );
    res.redirect(entry?.redirectUrl ?? "")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})