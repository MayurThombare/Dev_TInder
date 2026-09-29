const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./model/user");
const app = express();

const port = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body

    const user = new User(userData);
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    console.error("error creating user", err)
  }
});
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
