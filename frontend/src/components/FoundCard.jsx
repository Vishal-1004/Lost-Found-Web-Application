import React, { useState } from 'react';

function FoundCard({ url, title, date, about, location, detail }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    transition: 'box-shadow 0.25s ease-in-out',
    boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(207, 216, 220, 0.4)',
  };

  const shortAbout = about.length > 180 ? `${about.substring(0, 180)}...` : about;
  const shortTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;

  return (
    <div
      className="bg-white p-[10px] pb-[16px] rounded-[16px] min-w-[300px] max-w-[300px]"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-[12px] overflow-hidden border border-gray-400 text-center" style={{ width: '100%', height: '300px' }}>
        <img
          src={url}
          alt={title}
          className="h-[250px] w-full object-cover"
        />
      </div>

      <div className="mt-6">
        <div className="flex flex-col">
          <h3 className="mb-1.5 font-bold text-[20px] capitalize text-gray-700">
            {shortTitle}
          </h3>
        </div>
        
        <p className="text-[14px] text-gray-500 mb-2">{location}</p>

        <p className="text-[14px] text-gray-700">{shortAbout}</p>

        <p className="mt-4 text-[#333333] text-[13px] font-semibold">
          {date}
        </p>
      </div>
    </div>
  );
}

export default FoundCard;
