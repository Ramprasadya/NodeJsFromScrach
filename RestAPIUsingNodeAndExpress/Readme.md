Dynamic routes 
http://localhost:2610/user/:id

id -> parameter value 


// Predefined middleware
// is used to parse incoming request bodies with application/x-www-form-urlencoded content type.
app.use(express.urlencoded({extended:false}))



error -> TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Array
    at Object.writeFile (node:fs:2369:5)

solution ->  JSON.stringify(users)


Middleware

app.use((req,res,next)=>{
  console.log("hello from middleware 1")

  // res.send({msg:"hello from middleware 1"})

  next()
})


if not use next function then it will not goes on any routes or api it will only console the value And also you can end the api call from the middle ware 


* we can acces middleware data in any request

// Another middleware
app.use((req,res,next)=>{
  console.log("hello from middleware 1")
  req.myName = "ram"
  // res.send({msg:"hello from middleware 1"})

  next()
})
app.use((req,res,next)=>{
  console.log("hello from middleware 2",req.myName)

  next()
})

* Creating a log file that will store the req Time , Type ,Path

app.use((req,res,next)=>{
  fs.appendFile("./log.txt",`\n ${Date.now()} : ${req.method} : ${req.path}`,(err,data)=>{
    next()
  })
})

middleware
