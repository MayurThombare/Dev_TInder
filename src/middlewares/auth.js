const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      res.status(401).send("please login")
    }
    const decodedMessage =  await jwt.verify(token, process.env.JWT_SECRET );

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
