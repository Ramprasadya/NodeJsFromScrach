import os from 'node:os'
import cluster from 'node:cluster'
import express from 'express'

const totalCpu = os.cpus().length

// console.log(totalCpu)

if(cluster.isPrimary){
    for(let i=0; i<totalCpu; i++){
        cluster.fork()
    }
    
}else{
    const app = express()
    const port = 8000
    app.get("/", (req,res)=>{
        res.send("Hello world Clustor ")
    })

    app.listen(port,()=>
        console.log(`Server running on http://localhost:${port}`)
    )
}