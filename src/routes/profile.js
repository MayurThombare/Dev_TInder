
const express = require("express");
const {userAuth}= require("../middlewares/auth")
const User = require("../model/user");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
   const user = req.user;

    res.send(user);
  } catch (err) {
    res.send("Error fetching profile" + err.message);
  }
});

profileRouter.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  const users = await User.find({ email: userEmail });
  if (users.length === 0) {
    res.status(404).send("No Users Found");
  } else {
    res.status(200).send(users);
  }
});

profileRouter.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  try {
    const Allowed_Updates = ["photoUrl", "about", "gender", "skills", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid Update");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updatedUser);
    if (!updatedUser) {
      res.status(404).send("User Not found for update");
    } else {
      res.send("User Updated");
    }
    console.log(updatedUser);
  } catch (err) {
    res.status(500).send(`Error Updating User ${err}`);
  }
});

profileRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).send("User Not Found for deletion");
    } else {
      res.send("User Deleted Successfully");
    }
  } catch (err) {
    res.status(500).send("Error Deleting User");
  }
});

module.exports={
    profileRouter
}