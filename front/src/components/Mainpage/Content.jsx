import React from 'react';
import { useNavigate } from 'react-router-dom';

const Content = () => {
  const navigate = useNavigate();

  const handleBuyerClick = () => {
    navigate('/SignupBuyer'); // Navigate to the Signup for buyer component
  };
  
  const handleSellerClick = () => {
    navigate('/SignupSeller'); // Navigate to the Signup for seller component
  };

  return (
    <>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/main.jpg')" }}>
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
          <h1 className="text-white text-6xl md:text-7xl font-extrabold mb-6 font-serif text-center shadow-lg">ArtisanRise</h1>
          <p className="text-white text-lg md:text-xl mb-4 text-center px-4 md:px-0 font-sans leading-relaxed shadow-md">
            Discover extraordinary items and connect with talented artisans from around the globe. 
            <span className="font-semibold">Experience the beauty of craftsmanship like never before!</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-orange-50 p-6">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img 
            src="/images/mainbuyer.jpg" 
            alt="Buyer at ArtisanRise" 
            className="rounded-lg shadow-lg object-cover h-96 w-full md:w-3/4"
          />
        </div>

        {/* Right Side: Text and Button */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4 text-black-600">Become a Buyer at ArtisanRise</h1>
          <p className="text-lg mb-6 px-4 md:px-0">
            Discover and purchase unique items created by talented artisans from around the world. ArtisanRise connects you with creators to bring the beauty of their work directly to your home.
          </p>
          <button 
            onClick={handleBuyerClick} 
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 shadow-lg"
          >
            Continue as Buyer
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-amber-50 p-6">
        {/* Left Side: Text and Button */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4 text-black-600">Become a Seller at ArtisanRise</h1>
          <p className="text-lg mb-6 px-4 md:px-0">
            Showcase your unique creations to a global audience. ArtisanRise connects you with buyers who appreciate quality and originality. Start selling your items today!
          </p>
          <button 
            onClick={handleSellerClick} 
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300 shadow-lg"
          >
            Continue as Seller
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img 
            src="/images/mainseller.jpg" 
            alt="Seller at ArtisanRise" 
            className="rounded-lg shadow-lg object-cover h-96 w-full md:w-3/4"
          />
        </div>
      </div>
    </>
  );
}

export default Content;
