const mongoose = require ('mongoose');  
const userSchema = new mongoose.Schema(
    {
        name: String,
        username: String,
        password:String,
        userType:String,
    }
);

module.exports = mongoose.model("users",userSchema)