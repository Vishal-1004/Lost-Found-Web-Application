import { useState } from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillCalendar } from "react-icons/ai";
import { useSelector } from "react-redux";

const DetailedView = ({ url, title, date, about, location, founder }) => {
  const userToken = useSelector((state) => state.storedUserData.userToken);
  const userStatus = useSelector((state) => state.storedUserData.userStatus);
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  // use this variable for on-hover actions
  const [isHovered, setIsHovered] = useState(false);

  const shortAbout =
    about.length > 250 ? `${about.substring(0, 250)}...` : about;
  const shortTitle = title.length > 25 ? `${title.substring(0, 25)}...` : title;

  const handleEdit = () => {
    console.log("EDIT THIS ITEM CARD");
  }

  const handleDelete = () => {
    console.log("DELETE THIS ITEM CARD");
  }

  return (
    <div
      className="bg-white p-2 rounded-[16px] grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-[30px] max-w-[800px]"
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
          style={{ width: "100%", height: "300px" }}
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
            {date}
          </p>

          {/* Location */}
          <div className="text-[14px] text-gray-500 font-semibold mb-2 flex items-center gap-1">
            <FaMapMarkerAlt className="mr-2" size={"20px"} />
            {location}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-8 md:gap-2 justify-between text-gray-600">
        {/* Description */}
        <p className="text-[14px] sm:text-[16px] md:text-[17px] break-words">
          {shortAbout}
        </p>

        {/* Posted By */}
        {!userToken ? (
          <p className="text-[15px] font-semibold">Posted by:</p>
        ) : (
          ""
        )}
        <div
          className={`${
            userToken ? "" : "blur"
          } border border-gray-300 rounded-[8px] p-2 md:mt-2 flex flex-col gap-1 text-gray-600`}
        >
          {/* Heading */}
          <p className="text-[15px] font-semibold">Posted by:</p>

          {/* Name */}
          <p className="text-[14px] break-words">
            <span className="font-semibold text-[13px] mr-2">Name:</span>
            {userToken ? founder.name : ""}
          </p>

          {/* Registration number */}
          <p className="text-[14px]">
            <span className="font-semibold text-[13px] mr-2">
              Registration no.:
            </span>
            {userToken ? founder.regNo : ""}
          </p>

          {/* Email */}
          <p className="text-[14px] break-words">
            <span className="font-semibold text-[13px] mr-2">Email:</span>
            {userToken ? founder.email : ""}
          </p>

          {/* Hosteller or Day Scholar */}
          <p className="text-[14px]">
            <span className="font-semibold text-[13px] mr-2">
              Hosteller/Day Scholar:
            </span>
            {userToken ? founder.dayScholarORhosteler : ""}
          </p>

          {/* Contact Number */}
          {founder.number ? (
            <p className="text-[14px]">
              <span className="font-semibold text-[13px] mr-2">Contact:</span>
              {userToken ? founder.number : ""}
            </p>
          ) : null}
        </div>
        {!userToken ? (
          <div className="p-4 mt-4 border border-blue-300 bg-blue-100 rounded-md">
            Login to view details
          </div>
        ) : (
          ""
        )}

        {(userStatus==="ADMIN" || userEmail===founder.email) && 
          <div className="w-full flex justify-between">
            <button 
              className="btnSubmit bg-blue-400 hover:bg-blue-600 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button 
              className="btnSubmit bg-red-400 hover:bg-red-600 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        }
      </div>
    </div>
  );
};

DetailedView.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  founder: PropTypes.shape({
    name: PropTypes.string.isRequired,
    regNo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dayScholarORhosteler: PropTypes.string.isRequired,
    // number: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailedView;
