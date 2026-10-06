const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:  true,
        trim: true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid'+ value);
            }
        }
    },
    password:{
        type: String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('password is not strong enough');
            }
        }
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error('Gender must be male, female or other');
            }
        },
    },
    about:{
        type: String,
        default:'This is default about ',
    },
    photoUrl:{
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbNQogRbItn4HFhQDTAc1Y5S8R__IQntTtFDqHr5PoQA&s=10",
        validator(value){
            if(!validator.isURL(value)){
                throw new Error('Photo URL is invalid');
            }
        }
    },
    skills:{
        type: [String],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

