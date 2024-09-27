import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormPopup from "./FormPopup";
import { FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { AiFillCalendar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ToastMsg from "../constants/ToastMsg";
import moment from "moment";
import { FaAsterisk } from "react-icons/fa";
import {
  deleteFoundItemPostByUserFunction,
  deleteLostItemPostByUserFunction,
} from "../services/API";
import { tryFetchingData } from "../actions";

const DetailedViewB = ({
  id,
  url,
  title,
  date,
  about,
  location,
  founder,
  type,
}) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.storedUserData.userToken);
  const userStatus = useSelector((state) => state.storedUserData.userStatus);
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const shortAbout =
    about.length > 250 ? `${about.substring(0, 250)}...` : about;
  const shortTitle = title.length > 25 ? `${title.substring(0, 25)}...` : title;

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [showEnterOTPPopup, setShowEnterOTPPopup] = useState(false);
  const [otp, setOtp] = useState("");

  // State for the new input fields in OTP popup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Automatically set the current date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setCurrentDate(today);
  }, []);

  // Validation function for required fields
  const isFormValid = () => {
    return name && email && regNumber && phoneNumber;
  };

  const handleOpenEditPopup = () => {
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      let response;
      if (type === "lost") {
        response = await deleteLostItemPostByUserFunction(founder.email, id);
      } else {
        response = await deleteFoundItemPostByUserFunction(founder.email, id);
      }
      if (response.status === 200) {
        ToastMsg(response.data.message, "success");
        dispatch(tryFetchingData());
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleReturnClick = () => {
    setShowOTPPopup(true);
  };

  const handleGenerateOTP = () => {
    setShowOTPPopup(false);
    setShowEnterOTPPopup(true);
  };

  const handleOTPSubmit = () => {
    setShowEnterOTPPopup(false);
    ToastMsg("OTP submitted successfully", "success");
  };

  const editData = {
    id,
    url,
    title,
    date,
    about,
    location,
    founder,
  };

  return (
    <div
      className="detailedCardPopup bg-white p-2 rounded-[16px] grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-[30px] max-w-[800px] h-[500px] overflow-scroll md:h-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Existing detailed view code */}
      <div className="flex flex-col justify-between">
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
          <div className="mt-4 flex justify-between items-center">
            <h3 className="mb-1.5 font-bold text-[20px] capitalize text-gray-700">
              {shortTitle}
            </h3>
          </div>

          <p className="mb-1.5 text-[#333333] text-[13px] font-semibold flex items-center gap-2">
            <AiFillCalendar className="mr-1" size={"20px"} color="#ADD8E6" />
            {moment(date).format("dddd, D MMM YYYY")}
          </p>

          <div className="text-[14px] text-gray-500 font-semibold mb-2 flex items-center gap-1 capitalize">
            <FaMapMarkerAlt className="mr-2" size={"20px"} color="#B0E57C" />
            {location}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-8 md:gap-2 justify-between text-gray-600">
        <p className="text-[14px] sm:text-[16px] md:text-[17px] break-words">
          {shortAbout}
        </p>

        <div
          className={`${
            userToken ? "" : "blur"
          } border border-gray-300 rounded-[8px] p-2 md:mt-2 flex flex-col gap-1 text-gray-600`}
        >
          <p className="text-[15px] font-semibold">Posted by:</p>

          <p className="text-[14px] break-words">
            <span className="font-semibold text-[13px] mr-2">Name:</span>
            {userToken ? founder.name : ""}
          </p>

          <p className="text-[14px]">
            <span className="font-semibold text-[13px] mr-2">
              Registration no.:
            </span>
            {userToken ? founder.regNo : ""}
          </p>

          <p className="text-[14px] break-words">
            <span className="font-semibold text-[13px] mr-2">Email:</span>
            {userToken ? founder.email : ""}
          </p>

          <p className="text-[14px]">
            <span className="font-semibold text-[13px] mr-2">
              Hosteller/Day Scholar:
            </span>
            {userToken ? founder.dayScholarORhosteler : ""}
          </p>

          {founder.number ? (
            <p className="text-[14px]">
              <span className="font-semibold text-[13px] mr-2">Contact:</span>
              {userToken ? founder.number : ""}
            </p>
          ) : null}
        </div>

        {(userStatus === "ADMIN" || userEmail === founder.email) && (
          <div className="w-full flex justify-between">
            <button
              className="btnSubmit bg-blue-400 hover:bg-blue-600 rounded"
              onClick={handleOpenEditPopup}
            >
              Edit
            </button>
            <button
              className="btnSubmit bg-green-400 hover:bg-green-600 rounded"
              onClick={handleReturnClick}
            >
              Return
            </button>
            <button
              className="btnSubmit bg-red-400 hover:bg-red-600 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleDelete}
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-3 animate-spin" />
                  Loading...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        )}
      </div>

      {/* Popup for generating OTP */}
    
{/* Popup for entering OTP */}
{showOTPPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
    <div className="relative bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-md">
    
          {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        onClick={() => setShowOTPPopup(false)}
      >
        &times;
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Return Details
      </h2>

      <form className="w-full" onSubmit={isFormValid() ? handleGenerateOTP : null} noValidate>
        <div className="flex flex-col gap-4">
          {/* Name Field */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="name">
              Name:<FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control text-gray-500`}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="email">
              Email: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control text-gray-500`}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Registration Number Field */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="regNumber">
              Registration Number: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              type="text"
              id="regNumber"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              className={`form-control text-gray-500`}
              placeholder="Enter your registration number"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="phoneNumber">
              Phone Number: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`form-control text-gray-500`}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Date Field */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center " htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={currentDate}
              className={`form-control text-gray-400`}
              readOnly
            />
          </div>

          {/* Submit Button */}
          <button
            className={`btnSubmit w-auto center mx-auto py-3 mt-6 text-white font-semibold rounded-lg ${
              !isFormValid() ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={!isFormValid()}
          >
            Generate OTP
          </button>
        </div>
      </form>
    </div>
  </div>
)}


{showEnterOTPPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
    <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center required">
        Enter OTP
      </h2>

      <form className="w-full" onSubmit={handleOTPSubmit} noValidate>
        <div className="flex flex-col gap-4">
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="otp">
              OTP:
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`form-control text-gray-500`}
              placeholder="Enter OTP"
              required
            />
          </div>

          <button
            className="btnSubmit w-1/3 mx-auto py-3 mt-6 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          >
              Submit OTP
          </button>
        </div>
      </form>
    </div>
  </div>
)}



      {/* Edit form popup */}
      {showEditPopup && (
        <FormPopup onClose={handleCloseEditPopup} formType="edit" data={editData} />
      )}
    </div>
  );
};

DetailedViewB.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  founder: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default DetailedViewB;
