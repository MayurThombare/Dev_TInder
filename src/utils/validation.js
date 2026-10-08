const validator = require('validator');

const validateSignupData = (req)=>{
   const {firstName, lastName, email,password} = req.body;

   if(!firstName || !lastName){
    throw new Error('first name and last name are required');

   }
   else if(firstName.length<4 || firstName.length> 20){
    throw new Error(' firstname must be betweeen 4 and 20 characters');
   }

   else if(!validator.isEmail(email)){
    throw new Error('Email is invalid');
   }
   else if(!validator.isStrongPassword(password)){
    throw new Error('password is not strong enough');
   }
}

module.exports = {
    validateSignupData
}