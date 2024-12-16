import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <input
        type="text"
        placeholder="Search by Product or Seller"
        className="w-full p-3 mb-6 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products or sellers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            >
              <img
                src={`http://localhost:5000/upload/${product.image}`}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{product.businessName}</h3>
                <p className="text-sm text-gray-600 mb-1">Product Name: {product.productName}</p>
                <p className="text-sm text-gray-600 mb-1">Gmail: {product.gmail}</p>
                <p className="text-sm text-gray-600 mb-1">Phone: {product.phonenumber}</p>
                <p className="text-md font-bold text-gray-800 mt-2">Price: ₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
