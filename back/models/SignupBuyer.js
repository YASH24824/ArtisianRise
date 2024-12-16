const mongoose = require('mongoose');

// Define the buyer schema
const BuyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  // Additional fields for buyers can go here
});

module.exports = mongoose.model('Buyer', BuyerSchema);
