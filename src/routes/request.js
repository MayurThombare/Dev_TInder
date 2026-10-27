const express = require("express");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user")
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserdId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserdId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ json: "Invalid status type " + status });
      }

      const toUser = await User.findById(toUserId);

      if(!toUser){
        return res.status(400).json({message:"User Not Found"})
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if(existingConnectionRequest){
        return res.status(400).json({message:"Connection request Already Exists"})
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + " is interested "+ toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR " + err.message);
    }

   
  },
);

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

module.exports = {
  requestRouter,
};
