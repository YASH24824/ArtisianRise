import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerInformation = () => {
  const [businessName, setBusinessName] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('businessName', businessName);
    formData.append('officeAddress', officeAddress);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('upiId', upiId);

    try {
      const response = await axios.post('http://localhost:5000/seller-information/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { newSellerInfo } = response.data;
      localStorage.setItem('sellerId', newSellerInfo._id);

      // Reset form fields
      setBusinessName('');
      setOfficeAddress('');
      setEmail('');
      setPhoneNumber('');
      setUpiId('');
      setProfilePic(null);

      alert('Seller information submitted successfully!');

      navigate('/SellerProfile');
    } catch (error) {
      console.error('Error submitting seller information:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
      }}
    >
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-4xl backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Seller Information</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-2"> {/* Reduced gap between fields */}
          <div className="mb-2"> {/* Reduced margin-bottom */}
            <label htmlFor="businessName" className="block text-gray-700 font-bold mb-1">Business Name</label>
            <input
              type="text"
              id="businessName"
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-2"> {/* Reduced margin-bottom */}
            <label htmlFor="officeAddress" className="block text-gray-700 font-bold mb-1">Office Address</label>
            <input
              type="text"
              id="officeAddress"
              placeholder="Enter your office address"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-2"> {/* Reduced margin-bottom */}
            <label htmlFor="email" className="block text-gray-700 font-bold mb-1">Email</label>
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

          <div className="mb-2"> {/* Reduced margin-bottom */}
            <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-1">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-2"> {/* Reduced margin-bottom */}
            <label htmlFor="upiId" className="block text-gray-700 font-bold mb-1">UPI ID</label>
            <input
              type="text"
              id="upiId"
              placeholder="Enter your UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4 col-span-1 md:col-span-2">
            <label htmlFor="profilePic" className="block text-gray-700 font-bold mb-1">Profile Picture</label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
  type="submit"
  className="w-32 bg-blue-500 text-white py-1 px-2 text-sm rounded-lg font-bold hover:bg-blue-600 transition duration-300 col-span-1 md:col-span-2"
>
  Submit
</button>

        </form>
      </div>
    </div>
  );
};

export default SellerInformation;
