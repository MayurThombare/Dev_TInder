const mongoose = require('mongoose');

 const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://memayurt786_db_user:nzp576gxRdydthZN@cluster0.kc5doha.mongodb.net/devTinder');
};

module.exports = {
    connectDB
}