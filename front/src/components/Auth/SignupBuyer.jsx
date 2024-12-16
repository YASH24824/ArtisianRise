import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupBuyer = () => {
  const [buyerData, setBuyerData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '', // Changed phoneNumber to phone
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/buyer', buyerData);
      if (response.status===201) {
        setSuccess('Buyer signed up successfully');
        setError('');
        navigate('/ProductList');
      } else {
        setError(response.data.message);
        setSuccess('');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/allinone.png')" }}
      ></div>
      
      <div className="bg-white bg-opacity-50 p-10 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up as Buyer</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={buyerData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={buyerData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={buyerData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-bold">Phone</label> {/* Changed from Phone Number to Phone */}
            <input
              type="tel"
              name="phone"
              value={buyerData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-bold">Address</label>
            <textarea
              name="address"
              value={buyerData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Signup
            </button>
          </div>

        </form>

        {/* Already have an account */}
        <p className="mt-6 text-center text-gray-900">
          Already have an account?{' '}
          <Link to="/LoginBuyer" className="text-blue-500 hover:underline font-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupBuyer;

