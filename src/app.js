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
app.use(express.json());
 const {authRouter} = require("./routes/auth");
 const {profileRouter} = require("./routes/profile");
 const {requestRouter} = require("./routes/request");
 const {userRouter} = require("./routes/user")

 app.use("/", authRouter);
 app.use('/', profileRouter);
 app.use('/', requestRouter);
 app.use("/", userRouter)


const port = 3000;



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
