const SellerInformation = require('../models/SellerInformation');


exports.updateSellerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      businessName,
      officeAddress,
      email,
      phoneNumber,
      upiId,
    } = req.body;

    // Check if the seller ID is valid
    

    // Handle the profile picture if uploaded
    const profilePic = req.file ? req.file.filename : undefined; // Use undefined to avoid updating the field if not provided

    // Prepare the update object
    const updateData = {
      businessName,
      officeAddress,
      email,
      phoneNumber,
      upiId,
    };

    
    

    // Update the seller information
    const sellerInfo = await SellerInformation.findByIdAndUpdate(id, updateData, { new: true });

    if (sellerInfo) {
      res.json(sellerInfo);
    } else {
      res.status(404).json({ message: 'Seller information not found' });
    }
  } catch (error) {
    console.error('Error updating seller information:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating seller information' });
  }
};
                              

// Controller for handling seller information submission (upload handled in router)
exports.sellerInformation = async (req, res) => {
  try {
    const { sellerId, businessName, officeAddress, email, phoneNumber, upiId } = req.body;
    const profilePic = req.file ? req.file.filename : ''; // Profile picture file if uploaded

    // Create a new seller record
    const newSellerInfo = await SellerInformation.create({
      sellerId, 
      businessName,
      officeAddress,
      email,
      phoneNumber,
      upiId,
      profilePic,
    });

    // Respond with success message and the new seller info
    res.json({ success: true, message: 'Seller information saved successfully', newSellerInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error saving seller information', error });
  }
};

// Fetch seller profile information by seller ID
exports.profileInformation = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const sellerInfo = await SellerInformation.findById(sellerId); // Fetch by seller ID

    if (sellerInfo) {
      res.json(sellerInfo);
    } else {
      res.status(404).json({ message: 'Seller information not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller information', error });
  }
};
