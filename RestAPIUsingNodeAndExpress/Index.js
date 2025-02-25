const express = require("express");
const app = express();
const port = 2610;
const users = require("./MOCK_DATA.json");
const fs = require("fs");
// Predefined middleware
// is used to parse incoming request bodies with application/x-www-form-urlencoded content type.
app.use(express.urlencoded({ extended: false }));

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

app.use((req,res,next)=>{
  fs.appendFile("./log.txt",`\n ${Date.now()} : ${req.method} : ${req.path}`,(err,data)=>{
    next()
  })
})

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.get("/user", (req,  res) => {
  const html = `
    <ul>
    ${users
      .map((item, index) => {
        return `<li>${item.first_name}</li>`;
      })
      .join(" ")}
    </ul>
    `;
  res.send(html);
});

app.get("/users",(req,res)=>{
  console.log("Hello from users route ", req.myName)
  res.setHeader("X-Name","Ramprasad") //Custom Headers
  // Always add X to custom headers
  return res.json(users)
})

app
  .route("/user/:id")
  .get((req, res) => {
    const _id = Number(req.params.id);
    const user = users.find((id) => id.id === _id);
    res.json(user);
  })
  .patch((req, res) => {
    const { id } = req.params;
       const {first_name,last_name,job_title,gender,email} = req.body;
    // const { data } = req.body;
    let user = users.find((users) => users.id === Number(id));
    if(first_name) user.first_name = first_name
    if(last_name) user.last_name = last_name
    if(job_title) user.job_title =job_title
    if(gender) user.gender =gender
    if(email) user.email =email
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        res.json({status:"success",id:id})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
     let updated =users.filter((user)=>user.id !==Number(id))
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(updated),()=>{

        return res.json({ status: "Deleeted " ,id:id })
    })
  });

// Creating new user  in json file
app.post("/api/user", (req, res) => {
  const body = req.body;
  if(!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender){
    res.status(400).send({messsage:"All field are required"})
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
