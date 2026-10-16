const express = require("express");

const {userAuth}= require("../middlewares/auth");
const requestRouter = express.Router();


requestRouter.post("/sendconnectionrequest", userAuth, async (req,res)=>{

const user = req.user;


  console.log('sending connecting request');

  res.send(user.firstName + " sending connection request")
})

requestRouter.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      res.status(404).send("No Users found");
    }
    res.status(200).send(allUsers);
  } catch (err) {
    console.error("error fetching users", err);
    res.status(500).send("Error fetching users");
  }
});

module.exports={
    requestRouter
}