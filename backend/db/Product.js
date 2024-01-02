const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {   
        username:String,
        product: String,
        description:String,
        status:String,
        price:Number,
        // email:String,
    }
);
module.exports =mongoose.model("product",ProductSchema);