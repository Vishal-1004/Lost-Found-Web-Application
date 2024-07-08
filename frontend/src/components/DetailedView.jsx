import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillCalendar } from 'react-icons/ai';

const DetailedView = ({ url, title, date, about, location, founder }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const formattedDate = format(new Date(date), 'EEEE, d MMM yyyy');
  
    const cardStyle = {
      transition: 'box-shadow 0.25s ease-in-out',
      boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(207, 216, 220, 0.4)',
    };
  
    const shortAbout =
      about.length > 250 ? `${about.substring(0, 250)}...` : about;
    const shortTitle = title.length > 25 ? `${title.substring(0, 25)}...` : title;

    // handle claim button action
    const handleClaim = () => {
      console.log("Claim this item");
    }
  
    return (
      <div 
        className="bg-white p-[16px] rounded-[16px] grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-[30px] max-w-[800px]"
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <style>
          {`
            .btnSubmit {
                @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
            }
          `}
        </style>
        <div className="flex flex-col justify-between">
          {/* Item image */}
          <div 
            className="rounded-[12px] overflow-hidden border border-gray-400 text-center" 
            style={{width:"100%", height:"300px"}}
          >
            <img 
              src={url}
              alt={title}
              className="h-[300px] w-full md:w-[400px] object-cover"
            />
          </div>
  
          <div className="flex flex-col gap-1 sm:gap-[10px]">
            {/* Item title */}
            <div className="mt-4 flex justify-between items-center">
              <h3 className="mb-1.5 font-bold text-[20px] capitalize text-gray-700">
                {shortTitle}
              </h3>
            </div>

            {/* Date */}
            <p className="mb-1.5 text-[#333333] text-[13px] font-semibold flex items-center gap-2">
              <AiFillCalendar className="mr-1" size={"20px"} />
              {formattedDate} 
            </p>
            
            {/* Location */}
            <div className="text-[14px] text-gray-500 font-semibold mb-2 flex items-center gap-1">
              <FaMapMarkerAlt className="mr-2" size={"20px"} />
              {location}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-8 md:gap-0 justify-between text-gray-600">
          {/* description */}
          <p className="text-[14px] sm:text-[16px] md:text-[20px]">
            {shortAbout}
          </p>

          {/* Founder information */}
          <div className='flex flex-col gap-2'>
            <p className="font-semibold text-[14px]">
              Posted by:{" "}{founder.name}
            </p>
            <p className="font-semibold text-[14px]">
              Email:{" "}{founder.email}
            </p>
            <p className="font-semibold text-[14px]">
              Contact:{" "}{founder.number}
            </p>
          </div>

          {/* Claim button */}
          <div className='text-center sm:text-left'>
            <button 
              onClick={handleClaim}
              className='btnSubmit'
            >
              Claim !
            </button>
          </div>
        </div>
      </div>
    );
};

export default DetailedView;
