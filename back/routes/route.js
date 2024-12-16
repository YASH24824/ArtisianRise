const express = require("express");
const { LoginSeller, SignupSeller } = require("../controller/SignupSeller");
const { profileInformation, sellerInformation, updateSellerProfile } = require("../controller/SellerInformation");
const { addProduct, getProduct, getAllProducts, deleteProduct } = require("../controller/product");
const { upload } = require("../upload/upload"); // Import multer configuration
const { SignupBuyer, LoginBuyer } = require("../controller/SignupBuyer"); // Import buyer controllers
const router = express.Router();

// Seller login and signup routes
router.post('/seller/login', LoginSeller);
router.post('/seller/', SignupSeller);

// Seller information routes (use .single() where file upload is expected)
router.post('/seller-information/post', upload.single('profilePic'), sellerInformation);
router.get('/seller-information/:sellerId', profileInformation);
router.delete('/products/:id',deleteProduct)
router.put('/update/seller-information/:id',upload.single("profilePic"), updateSellerProfile); // Ensure this points to the correct controller method


// Product routes (use .single() where file upload is expected)
router.post('/add-product', upload.single('image'), addProduct);
router.get('/products/:sellerId', getProduct);
router.get('/products', getAllProducts);

// Buyer login and signup routes (newly added)
router.post('/buyer/login', LoginBuyer);
router.post('/buyer', SignupBuyer);


// Export the router
module.exports = router;
