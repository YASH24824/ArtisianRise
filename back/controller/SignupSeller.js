const Seller = require('../models/SignupSeller');

// Signup route
exports.SignupSeller = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
        return res.status(400).json({ success: false, message: 'Seller already exists.' });
    }

    // Create a new seller
    const newSeller = new Seller({ username, email, password });
    try {
        await newSeller.save();
        res.status(201).json({ success: true, message: 'Seller registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
};

// Login route
exports.LoginSeller = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Find seller with matching email and password
    const seller = await Seller.findOne({ email, password });
    if (!seller) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({ success: true, sellerId: seller._id });
};
