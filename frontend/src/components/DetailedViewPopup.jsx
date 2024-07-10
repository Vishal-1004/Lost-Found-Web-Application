import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import DetailedView from "./DetailedView";
import PropTypes from "prop-types";

const DetailedViewPopup = ({ item, onClose }) => {
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
        <DetailedView
          url={itemImage}
          title={title}
          date={date}
          about={description}
          location={location}
          founder={founder}
        />
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
    personNumber: PropTypes.string.isRequired,
    personRegistrationNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailedViewPopup;
