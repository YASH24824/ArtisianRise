import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    businessName: '',
    productName: '',
    description: '',
    price: '',
    image: null,
    phonenumber: '',
    gmail: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    // If navigating from SellerProfile, set initial form values
    if (location.state) {
      const { businessName, gmail, phonenumber } = location.state;
      setProductData({
        ...productData,
        businessName,
        gmail,
        phonenumber,
      });
    }
  }, [location.state]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sellerId", sellerId);
    formData.append('businessName', productData.businessName);
    formData.append('productName', productData.productName);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('image', productData.image);
    formData.append('gmail', productData.gmail);
    formData.append('phonenumber', productData.phonenumber);

    try {
      await axios.post('http://localhost:5000/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully');
      navigate('/SellerProfile');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="businessName">Business Name</label>
            <input
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              id="businessName"
              name="businessName"
              value={productData.businessName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="productName">Product Name</label>
            <input
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              id="productName"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2 col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="description">Description</label>
            <textarea
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              id="description"
              name="description"
              rows="4"
              value={productData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="gmail">Gmail</label>
            <input
              required
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              id="gmail"
              name="gmail"
              value={productData.gmail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="phonenumber">Phone Number</label>
            <input
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              id="phonenumber"
              name="phonenumber"
              type="tel"
              value={productData.phonenumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="price">Price (INR)</label>
            <input
              required
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2 col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-bold mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Centered small button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-30 bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
