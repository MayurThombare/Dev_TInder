const mongoose = require('mongoose');

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
    },
    password:{
        type: String,
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
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbNQogRbItn4HFhQDTAc1Y5S8R__IQntTtFDqHr5PoQA&s=10"
    },
    skills:{
        type: [String],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

