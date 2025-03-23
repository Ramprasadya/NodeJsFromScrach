const express = require("express");
const User = require("../model/UserMode");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "IAMYADAVRAM$12345"

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let exist = await User.findOne({email});
    if(exist){
      return res.status(400).json({message:"User with this email Already exist"})
    }
    // Password hashing 
    const salt  =  await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    if (!name || !email || !password) {
      return res.status(400).send("Send Correct Data ");
    }
    // Creating user
    const user =
     await User.create({ name, email, password:hashPassword });
    //  generating token
    const token  =  jwt.sign({userId : user._id},JWT_SECRET)
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login",async(req,res)=>{
  try {
    const {email,password} = req.body;
    let user = await User.findOne({email})
    if(!user){
      res.status(400).json({msg:"User Does not exist"})
    }
    const IsMatched = await bcrypt.compare(password, user.password)
    console.log(IsMatched);
    
    if(!IsMatched){
      return res.status(400).json({msg:"Wrong Credential"})
    }
    res.status(200).json({msg:"Login sucess", user})
  } catch (error) {
    console.log(error);
    
  }
})

router.get("/read",async(re,res)=>{
    try {
        let data  = await User.find({})
        res.status(200).json({data})
    } catch (error) {
        console.log(error);
    }
})

router.patch("/update/:id", async (req, res) => {
  try { 
    let Id = req.params.id;
    const updates = req.body;
    if (!Id) {
      return res.status(400).json({ error: "Id is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      Id,
      { $set: updates } 
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ message: "Updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
  }
});


router.delete("/delete/:id",async(req,res)=>{
     try {
        let id  = req.params.id
        let user = await User.findByIdAndDelete(id)
        res.status(200).json(user)
     } catch (error) {
        console.log(error);
        
     }
})



module.exports = router;
