import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4"> {/* Reduced padding */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
        
        {/* Left: Logo or Website Name */}
        <div className="mb-2 md:mb-0"> {/* Reduced margin bottom */}
          <h1 className="text-2xl">ArtisanRise</h1>
          <p className="text-xs text-gray-400">
            Buyers purchase; sellers provide offerings.
          </p>
        </div>

        {/* Center: Connect with Us */}
        <div className="text-center mb-2 md:mb-0"> {/* Reduced margin bottom */}
          <h2 className="text-lg font-semibold mb-1">Connect with Us</h2> {/* Reduced font size */}
          <p className="text-xs text-gray-400">Stay updated with our latest offerings and news!</p>
        </div>

        
      </div>

      <div className="text-center text-xs mt-2 border-t border-gray-700 pt-2"> {/* Reduced margin top */}
        &copy; {new Date().getFullYear()} ArtisanRise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
