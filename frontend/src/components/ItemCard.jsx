import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillCalendar } from 'react-icons/ai';
import { format } from 'date-fns';

function ItemCard({ url, title, date, about, location, }) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = format(new Date(date), 'EEEE, d MMM yyyy');

  const cardStyle = {
    transition: "box-shadow 0.25s ease-in-out",
    boxShadow: isHovered
      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
      : "0 4px 12px rgba(207, 216, 220, 0.4)",
  };

  const shortAbout =
    about.length > 100 ? `${about.substring(0, 100)}...` : about;
  const shortTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;

  return (
    <div
      className="bg-white p-[10px] pb-[16px] rounded-[16px] min-w-[300px] max-w-[300px] h-[540px] cursor-pointer"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="rounded-[12px] overflow-hidden border border-gray-400 text-center"
        style={{ width: "100%", height: "300px" }}
      >
        <img src={url} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="mt-6">
        <div className="flex flex-col">
          <h3 className="mb-1.5 font-bold text-[20px] capitalize text-gray-700">
            {shortTitle}
          </h3>
        </div>

        <div className="text-[14px] text-gray-500 font-semibold mb-2 flex items-center gap-1">
          <FaMapMarkerAlt className="mr-2" size={"20px"} />
          {location}
        </div>

        <p className="text-[14px] text-gray-700 break-words">{shortAbout}</p>

        <div className="mt-4 text-[#333333] text-[13px] font-semibold flex items-center gap-2">
          <AiFillCalendar className="mr-1" size={"20px"} />
          {formattedDate}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
