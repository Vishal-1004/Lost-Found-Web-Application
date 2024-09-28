import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import FoundItemForm from "./FoundItemForm";
import LostItemForm from "./LostItemForm";
import EditForm from "./EditForm";
import ReturnForm from "./ReturnForm";

function FormPopup({ isOpen, onClose, type, editData }) {
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
    if (isOpen) {
      document.addEventListener("mousedown", handleCloseOnOutsideClick);
      document.addEventListener("keydown", handleEscapeKeyPress);
    } else {
      document.removeEventListener("mousedown", handleCloseOnOutsideClick);
      document.removeEventListener("keydown", handleEscapeKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseOnOutsideClick);
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // dull backdrop
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[150]">
        <style>
            {`
              .modal {
                scrollbar-width: none;
              }
            `}
        </style>
      {/* popup div */}
      <div 
        ref={popupRef}
        className="modal max-w-[600px] max-h-[70vh] sm:max-h-[85vh] relative bg-white p-5 rounded-lg w-4/5 sm:w-full overflow-x-auto overflow-y-auto"
      >
        {/* close button */}
        <button
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {/* found popup heading */}
        {type==="found" && <h2 className="text-2xl sm:text-3xl text-gray-500 hover:text-gray-600 font-bold mb-4 text-center">Add Found Item</h2>}
        
        {/* lost item heading */}
        {type==="lost" && <h2 className="text-2xl sm:text-3xl text-gray-500 hover:text-gray-600 font-bold mb-4 text-center">Add Lost Item</h2>}
        
        {/* edit item heading */}
        {type==="edit" && <h2 className="text-2xl sm:text-3xl text-gray-500 hover:text-gray-600 font-bold mb-4 text-center">Edit Item</h2>}
        
        {/* return item heading */}
        {type==="return" && <h2 className="text-2xl sm:text-3xl text-gray-500 hover:text-gray-600 font-bold mb-4 text-center">Return Detail</h2>}

        {/* form components */}
        {type==="found" && 
          <FoundItemForm onClose={onClose} />
        }
        {type==="lost" && 
          <LostItemForm onClose={onClose} />
        }
        {type==="edit" && 
          <EditForm onClose={onClose} editData={editData} />
        }
        {type==="return" && 
          <ReturnForm onClose={onClose} />
        }
      </div>
    </div>
  );
};

export default FormPopup;
