Dynamic routes 
http://localhost:2610/user/:id

id -> parameter value 


// Predefined middleware
// is used to parse incoming request bodies with application/x-www-form-urlencoded content type.
app.use(express.urlencoded({extended:false}))



error -> TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Array
    at Object.writeFile (node:fs:2369:5)

solution ->  JSON.stringify(users)