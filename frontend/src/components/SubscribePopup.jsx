import React, { useState, useEffect } from 'react';

const SubscribePopup = ({ setIsSubscribed }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className.includes('popup-overlay')) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="popup-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
            <button className="absolute top-2 right-2 text-gray-600 text-2xl" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Subscribe to Lost & Found Updates</h2>
            <p className="mb-6 text-gray-600">Stay updated with the latest found items. Subscribe now!</p>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribePopup;
