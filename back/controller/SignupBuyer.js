const Buyer = require('../models/SignupBuyer')


exports.SignupBuyer = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  // Validate required fields
  if (!name || !email || !password || !address || !phone) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if buyer with the same email already exists
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create a new buyer
    const newBuyer = new Buyer({
      name,
      email,
      password,
      address,
      phone
    });

    // Save the buyer to the database
    await newBuyer.save();

    res.status(201).json({ message: 'Buyer registered successfully', buyer: newBuyer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Buyer Login Controller
exports.LoginBuyer = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const buyer = await Buyer.findOne({ email, password });
    
    if (buyer) {
      res.json({ success: true, message: 'Buyer logged in successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error during login' });
  }
};
