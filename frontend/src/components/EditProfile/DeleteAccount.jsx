import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountFunction } from "../../services/API";
import ToastMsg from "../../constants/ToastMsg";
import { removeUserData } from "../../actions";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);

  // Getting user email from localstorage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  // handling delete account click
  const handleDeleteAccount = async () => {
    setFormLoading(true);
    //console.log("Email of the user is: ", userEmail);
    try {
      const response = await deleteAccountFunction(userEmail);
      //console.log(response);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        dispatch(removeUserData());
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 flex md:items-center gap-4 md:gap-0 justify-center md:justify-start">
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-red-600 mb-4 mt-4 md:mt-0">
          Delete Account
        </h1>
        <div className="text-sm font-normal text-red-500 text-left max-w-[420px]">
          Please be certain before deleting your account, as all your data,
          including any lost/found posts you have created, will be permanently
          removed from the website. If you wish to use the website again in the
          future, you will need to create a new account.
        </div>
      </div>

      <div className="mt-3 text-left px-2">
        <button
          type="submit"
          onClick={handleDeleteAccount}
          className={`flex px-4 py-2 text-sm bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
        >
          {formLoading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            "Delete Account"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
