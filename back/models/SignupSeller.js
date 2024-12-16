const { default: mongoose } = require("mongoose");

const SellerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
module.exports = new mongoose.model('Seller', SellerSchema);