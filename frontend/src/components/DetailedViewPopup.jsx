import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import DetailedView from "./DetailedView";
import PropTypes from "prop-types";
import DetailedViewB from "./DetailedViewB";

const DetailedViewPopup = ({ item, onClose, type }) => {
  // console.log(type);
  const {
    itemImage,
    title,
    date,
    description,
    location,
    personDayScholarORhosteler,
    personEmail,
    personName,
    personNumber,
    personRegistrationNumber,
    _id,
  } = item;
  const founder = {
    name: personName,
    regNo: personRegistrationNumber,
    email: personEmail,
    dayScholarORhosteler: personDayScholarORhosteler,
    number: personNumber ? personNumber : null,
  };
  const popupRef = useRef(null);

  const handleCloseOnOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleEscapeKeyPress = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // close on outside click or esc button press
  useEffect(() => {
    document.addEventListener("mousedown", handleCloseOnOutsideClick);
    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleCloseOnOutsideClick);
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  return (
    // dull backdrop
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[150]">
      {/* popup div */}
      <div
        ref={popupRef}
        className="relative bg-white mx-4 lg:mx-0 p-5 rounded-lg max-w-[800px] w-4/5 sm:w-full overflow-x-auto overflow-y-auto"
      >
        {/* close button */}
        <button
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Detailed view card component */}
        {type === "found" ? (
          <DetailedView
            id={_id}
            url={itemImage}
            title={title}
            date={date}
            about={description}
            location={location}
            founder={founder}
            type={type}
          />
        ) : (
          <DetailedView
            id={_id}
            url={itemImage}
            title={title}
            date={date}
            about={description}
            location={location}
            founder={founder}
            type={type}
          />
        )}
      </div>
    </div>
  );
};

DetailedViewPopup.propTypes = {
  item: PropTypes.shape({
    itemImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    personDayScholarORhosteler: PropTypes.string.isRequired,
    personEmail: PropTypes.string.isRequired,
    personName: PropTypes.string.isRequired,
    personNumber: PropTypes.number.isRequired,
    personRegistrationNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailedViewPopup;
