const mongoose = require('mongoose');

 const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://mayurt2001_db_user:U7MWgtVJwnin0bh7@cluster0.uf9mxad.mongodb.net/devTinder');
    
};

module.exports = {
    connectDB
}