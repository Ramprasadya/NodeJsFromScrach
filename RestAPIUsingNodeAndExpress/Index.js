const express = require('express')
const app = express()
const port = 2610
const users  = require("./MOCK_DATA.json")

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})