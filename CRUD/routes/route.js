const express = require("express");
const User = require("../model/UserMode");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Send Correct Data ");
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
});

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
