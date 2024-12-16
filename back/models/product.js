const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }, // Reference to Seller
    productName: String,
    description: String,
    businessName:String,
    price: Number,
    image: String,
    gmail:String,
    phonenumber:String 
  });



module.exports = new mongoose.model('Product', ProductSchema);