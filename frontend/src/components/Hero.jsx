import { useState } from 'react'
import { Link } from 'react-router-dom';
import '../style/Hero.css'; 
import {FaSearch } from 'react-icons/fa';
import FormPopup from './FormPopup';

const HeroSection = () => {
  const [showFoundPopup, setShowFoundPopup] = useState(false);
  const [showLostPopup, setShowLostPopup] = useState(false);

  const handleOpenFoundPopup = () => {
    setShowFoundPopup(true);
  };
  
  const handleOpenLostPopup = () => {
    setShowLostPopup(true);
  };

  const handleCloseFoundPopup = () => {
    setShowFoundPopup(false);
  };

  const handleCloseLostPopup = () => {
    setShowLostPopup(false);
  };

  return (
    <div className="relative bg-gradient-to-r from-[#0D47A1] to-[#42A5F5] text-white h-[60vh] flex items-center justify-center z-1">
    {/* Abstract Geometric Pattern Overlay */}
    <div className="absolute inset-0 bg-pattern opacity-30"></div>
    <div className="relative text-center max-w-2xl mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Welcome to the VIT Lost & Found Hub
      </h1>
      <p className="text-lg sm:text-xl mb-8">
        Connecting you with your belongings.
      </p>
      <div className="flex flex-wrap justify-center space-x-0 space-y-4 md:space-x-4 md:space-y-0">
        <div className="flex w-full md:w-auto">
          <Link
            className="bg-white text-[#0D47A1] px-4 py-2 rounded shadow w-full md:w-auto hover:bg-gray-200 transition"
            onClick={handleOpenLostPopup}
          >
            I Lost Something
          </Link>
        </div>
        <div className="flex w-full md:w-auto">
          <Link
            className="bg-white text-[#0D47A1] px-4 py-2 rounded shadow w-full md:w-auto hover:bg-gray-200 transition"
            onClick={handleOpenFoundPopup}
          >
            I Found Something
          </Link>
        </div>
      </div>
    </div>
    <FormPopup isOpen={showFoundPopup} onClose={handleCloseFoundPopup} type="found" />
    <FormPopup isOpen={showLostPopup} onClose={handleCloseLostPopup} type="lost" />
  </div>
  );
};

export default HeroSection;
