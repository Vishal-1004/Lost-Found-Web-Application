import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ToastMsg from "../../constants/ToastMsg";

const SubscribeButton = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeToggle = async () => {
    setFormLoading(true);
    try {
      // API call here

      setTimeout(() => {
        setIsSubscribed(!isSubscribed);
        const message = isSubscribed
          ? "You have unsubscribed from notifications."
          : "You have successfully subscribed to notifications.";
        ToastMsg(message, "success");
        setFormLoading(false);
      }, 1000);
    } catch (error) {
      ToastMsg("Server error! Please try again later.", "error");
      setFormLoading(false);
    }
  };

  return (
    <form
      name="subscribe-button-form"
      className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 flex md:items-center gap-4 md:gap-0 justify-center md:justify-start"
      noValidate
    >
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-gray-700 mb-4">
          Notifications Subscription
        </h1>
        <div className="text-sm font-normal text-gray-500 text-left max-w-[420px]">
          Subscribe to receive notifications for the latest updates and important news. You can unsubscribe at any time.
        </div>
      </div>

      <div className="mt-3 text-left px-2">
        <button
          type="button"
          disabled={formLoading}
          onClick={handleSubscribeToggle}
          className={`btnSubmit px-4 py-2 text-sm ${
            isSubscribed ? "bg-red-500" : "bg-blue-500"
          } text-white rounded-md ${
            formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {formLoading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              Loading...
            </>
          ) : isSubscribed ? (
            "Unsubscribe"
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
    </form>
  );
};

export default SubscribeButton;
