import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditSeller = () => {
  const id = localStorage.getItem("sellerId");
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState({
    businessName: '',
    officeAddress: '',
    email: '',
    phoneNumber: '',
    upiId: '',
    profilePic: '',
  });
  const [loading, setLoading] = useState(true);
  const [newProfilePic, setNewProfilePic] = useState("");

  // Fetch the seller data by ID and populate the form fields
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/seller-information/${id}`);
        setSellerData(response.data);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(sellerData).forEach((key) => {
      formData.append(key, sellerData[key]);
    });

    if (newProfilePic) {
      formData.append('profilePic', newProfilePic);
    }

    try {
      await axios.put(`http://localhost:5000/update/seller-information/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully');
      navigate('/SellerProfile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Add your loading spinner here */}
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Seller Profile</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block mb-2">
              Business Name
              <input
                type="text"
                name="businessName"
                value={sellerData.businessName}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </label>
            <label className="block mb-2">
              Email
              <input
                type="email"
                name="email"
                value={sellerData.email}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </label>
            <label className="block mb-2">
              UPI ID
              <input
                type="text"
                name="upiId"
                value={sellerData.upiId}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </label>
            <div className="mt-4">
              <label className="block mb-2">Change Profile Picture:</label>
              <input type="file" name="profilePic" onChange={handleProfilePicChange} className="block w-full border border-gray-300 rounded mb-4" />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block mb-2">
              Office Address
              <input
                type="text"
                name="officeAddress"
                value={sellerData.officeAddress}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </label>
            <label className="block mb-2">
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                value={sellerData.phoneNumber}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </label>

            {sellerData.profilePic && (
              <div className="mt-2">
                <img
                  src={`http://localhost:5000/upload/${sellerData.profilePic}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto"
                />
              </div>
            )}
          </div>
          <div className="col-span-2 flex justify-center">
            <button type="submit" className="w-30 bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600 transition duration-300">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSeller;
