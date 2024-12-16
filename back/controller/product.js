const Product = require("../models/product");
const { upload } = require("../upload/upload");

// Route to add a new product
exports.addProduct = async (req, res) => {
  const { sellerId, productName, businessName, description, price, gmail, phonenumber } = req.body;

  // Basic validation
  if (!sellerId || !productName || !price || !gmail || !phonenumber) {
    return res.status(400).json({ success: false, message: 'Required fields are missing.' });
  }

  const image = req.file ? req.file.filename : '';  // Store the uploaded image filename

  const newProduct = new Product({
    sellerId,
    productName,
    businessName,
    description,
    price,
    image,
    gmail,
    phonenumber,
  });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully.', newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding product', error: error.message });
  }
};

// Route to get products by Seller ID
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.sellerId });
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found for this seller.' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
};

// Route to delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Extract the `id` from `req.params`
    
    // Attempt to find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // If no product was found with the given ID, return a 404 error
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Return success response if the product was deleted
    res.json({ success: true, message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};

// Route to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products available.' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
};
