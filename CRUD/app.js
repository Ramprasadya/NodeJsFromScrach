const express = require('express')
const ConnectToMongo = require('./connection/db')
const router = require('./routes/route')
const app = express()
const port = 8000

ConnectToMongo()
app.use(express.json())
app.use(router)



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})