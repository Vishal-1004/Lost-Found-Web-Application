import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseNotificationPopupCount,
  updateNotificationStatus,
} from "../actions";
import { updateNotificationFunction } from "../services/API";
import ToastMsg from "../constants/ToastMsg";

const SubscribePopup = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.storedUserData.userData.notifications
  );
  const email = useSelector((state) => state.storedUserData.userData.userEmail);

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    dispatch(increaseNotificationPopupCount());

    const handleClickOutside = (event) => {
      if (event.target.className.includes("popup-overlay")) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubscribe = async () => {
    try {
      // API call here
      const response = await updateNotificationFunction(email, !notifications);
      //console.log(response);
      if (response.status == 200) {
        dispatch(updateNotificationStatus(!notifications));
        ToastMsg(response.data.message, "success");
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="popup-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
            <button
              className="absolute top-2 right-2 text-gray-600 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Subscribe to Lost & Found Updates
            </h2>
            <p className="mb-6 text-gray-600">
              Stay updated with the latest found items. Subscribe now!
            </p>
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
