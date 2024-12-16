const { default: mongoose } = require("mongoose");

// Seller Information Schema
const SellerInformationSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }, // Reference to Seller
    businessName: String,
    officeAddress: String,
    email: String,
    phoneNumber: String,
    upiId: String,
    profilePic: String, // File name or path for the profile picture
  });
  
  // Product Schema
  module.exports =new mongoose.model('SellerInformation', SellerInformationSchema);

