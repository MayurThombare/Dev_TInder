const express = require("express");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data Fetched Successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

module.exports = {
  userRouter,
};
