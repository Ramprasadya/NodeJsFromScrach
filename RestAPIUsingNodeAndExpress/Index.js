const express = require('express')
const app = express()
const port = 2610
const users  = require("./MOCK_DATA.json")
const fs = require('fs')
// Predefined middleware
// is used to parse incoming request bodies with application/x-www-form-urlencoded content type.
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/user",(req,res)=>{
    const html= `
    <ul>
    ${users.map((item,index)=>{
        return (
            `<li>${item.first_name}</li>`
        )
    }).join(" ")}
    </ul>
    `;
    res.send(html)
})

app.route("/user/:id").get((req,res)=>{
    const _id = Number(req.params.id);
    const user = users.find((id)=> id.id === _id)
    res.json(user);
}).patch((req,res)=>{
    return res.json({status:"pending"})
}).delete((req,res)=>{
    return res.json({status:"pending"})
})

// Creating new user  in json file 
app.post("/api/user",(req,res)=>{
    const body = req.body
   users.push({...body,id:users.length +1})
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
       return res.json({status:"success",id:users.length})
   })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})