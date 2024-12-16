import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerProfile = () => {
  const [sellerData, setSellerData] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sellerId = localStorage.getItem('sellerId');

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        if (!sellerId) {
          throw new Error('No sellerId found in localStorage');
        }
        const response = await axios.get(`http://localhost:5000/seller-information/${sellerId}`);
        setSellerData(response.data);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${sellerId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    Promise.all([fetchSellerData(), fetchProducts()])
      .catch(err => console.error('Error in fetching data:', err))
      .finally(() => {
        setLoading(false);
      });
  }, [sellerId]);

  // Delete product function
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      // After deleting, you may want to refresh the product list
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const handleEditClick = () => navigate(`/EditSeller/${sellerId}`);
  const handleAddProductClick = () => navigate('/AddProduct', {
    state: {
      businessName: sellerData.businessName,
      gmail: sellerData.email,
      phonenumber: sellerData.phoneNumber,
    },
  });
  const handleShowProducts = () => navigate('/ProductList');
  const handleLogout = () => {
    localStorage.removeItem('sellerId');
    navigate('/SignupSeller');
  };

  if (loading) return <div>Loading...</div>;
  if (!sellerData || Object.keys(sellerData).length === 0) return <div>No seller information found.</div>;

  return (
    <div className="p-6 bg-gray-100 relative">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-md py-2 px-4 font-bold"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-gray-700 mb-6 text-center uppercase tracking-wider pb-2 border-b-4 border-blue-400 shadow-sm">
        Profile
      </h1>

      {/* Profile Section */}
      <div className="flex items-center mt-4 p-4 border border-gray-200 rounded-md bg-white shadow-sm">
        <img
          src={`http://localhost:5000/upload/${sellerData.profilePic}`}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full border-4 border-pink-400 mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{sellerData.businessName}</h2>
          <p className="text-gray-500">Office Address: {sellerData.officeAddress}</p>
          <p className="text-gray-500">Email: {sellerData.email}</p>
          <p className="text-gray-500">Phone Number: {sellerData.phoneNumber}</p>
          <p className="text-gray-500">UPI ID: {sellerData.upiId}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white rounded-md py-2 px-4 font-bold"
        >
          Edit Profile
        </button>
        <button
          onClick={handleAddProductClick}
          className="bg-green-500 text-white rounded-md py-2 px-4 font-bold"
        >
          Add Product
        </button>
      </div>

      {/* Products Section */}
      <h2 className="text-2xl mt-6 text-gray-800">Products</h2>
      <div className="flex flex-wrap mt-4">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="w-48 h-85 m-2 border border-gray-200 rounded-md p-4 bg-white shadow-sm text-center">
              <img
                src={`http://localhost:5000/upload/${product.image}`}
                alt={product.productName}
                className="w-full h-22 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">Product: {product.productName}</h3>
              <p className="text-gray-500">Description: {product.description}</p>
              <p className="font-bold text-gray-800 mt-2">Price: ₹{product.price}</p>
              <button
                onClick={() => handleDelete(product._id)} // Call the delete function with the product ID
                className="mt-4 bg-red-500 text-white rounded-md py-2 px-4 font-bold"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleShowProducts}
        className="mt-4 bg-blue-500 text-white rounded-md py-2 px-4 font-bold"
      >
        Show All Products
      </button>
    </div>
  );
};

export default SellerProfile;
