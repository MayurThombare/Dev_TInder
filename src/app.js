const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./model/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const user = require("./model/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();
app.use(cookieParser());

const port = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // create a JWT token
      const token = jwt.sign({ _id: user._id }, "DEV@Tinder$790");
      console.log("token", token);
      // Add token to the cookie and send the resposne back to the user

      res.cookie("token", token);
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.send("error" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
   const user = req.user;

    res.send(user);
  } catch (err) {
    res.send("Error fetching profile" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  const users = await User.find({ email: userEmail });
  if (users.length === 0) {
    res.status(404).send("No Users Found");
  } else {
    res.status(200).send(users);
  }
});

app.patch("/user/:userId", async (req, res) => {
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

app.delete("/user", async (req, res) => {
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

app.get("/feed", async (req, res) => {
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

app.post("/sendconnectionrequest", userAuth, async (req,res)=>{

const user = req.user;


  console.log('sending connecting request');

  res.send(user.firstName + " sending connection request")
})
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`server running on port  ${port}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed", err);
  });
