import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// LoginSeller Component
const LoginSeller = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/seller/login', {
        email,
        password,
      });

      // Check if the login is successful
      if (response.data.success) {
        navigate('/SellerInformation');
      } else {
        setErrorMessage(response.data.message || 'Invalid email or password');
      }

      // Clear form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('./images/backgroundsignup.jpg')" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm bg-opacity-40">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login Form</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Your Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Your Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <a href='/SignupSeller'>Signup</a>
        </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSeller;