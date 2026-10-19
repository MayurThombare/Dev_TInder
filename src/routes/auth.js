const express = require("express");
const User = require("../model/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //  validation of data
    validateSignupData(req);

    const { firstName, lastName, email, gender, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      gender,
      password: passwordHash,
    });
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    console.error(`Error creating user ${err}`);
    res.send("Error " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create a JWT token
      const token = await user.getJWT();
      console.log("token", token);
      // Add token to the cookie and send the resposne back to the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.send("error" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });

  res.send("Logout Successful");
});


module.exports = {
  authRouter,
};
