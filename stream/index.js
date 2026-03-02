import express from 'express'
import fs from 'fs'
const app  = express();
import status from 'express-status-monitor'
import zlib from 'zlib'

app.use(status())

fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")))

app.get("/",(req,res)=>{
   const stream = fs.createReadStream("./sample.txt",'utf-8')
   stream.on("data", (chunk)=>res.write(chunk))
   stream.on("end",(chunk)=> res.end())
})

app.listen(9090,()=>{
    console.log(`Server is running on http://localhost:9090`)
})