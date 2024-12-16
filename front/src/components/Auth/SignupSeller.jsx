import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupSeller = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/seller', {
        username,
        email,
        password,
      });

      navigate('/SellerInformation');

      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
         style={{ backgroundImage: "url('/images/signup2.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      <div className="relative bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Sign Up Form</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">Your Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white font-bold mb-2">Your Password</label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign Up as salesperson
          </button>
        </form>
        <p className="mt-4 text-gray-300 text-center">
          Already have an account?{' '}
          <Link to="/LoginSeller" className="text-blue-400 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupSeller;