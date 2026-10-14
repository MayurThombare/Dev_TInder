const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token !!!");
    }
    const decodedMessage =  await jwt.verify(token, "DEV@Tinder$790");

    const {_id}= decodedMessage;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.send("Error in authenticating user " + err.message);
  }
};
module.exports = {
  
  userAuth,
};
