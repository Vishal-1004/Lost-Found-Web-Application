import { useState } from "react";
import { FaAsterisk, FaSpinner } from "react-icons/fa";
import ToastMsg from "../../constants/ToastMsg";
import { updatePhoneNumber } from "../../actions";
import { updatePhoneNumberFunction } from "../../services/API";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const UpdatePhoneNumberForm = () => {
  const dispatch = useDispatch();

  // Getting user email from localstorage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  // Getting user current phone number
  const userPhoneNumber = useSelector(
    (state) => state.storedUserData.userData.userPhoneNumber
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formLoading, setFormLoading] = useState(false);

  const handlePhoneNoUpdate = async (formData) => {
    if (formData.phoneNumber == userPhoneNumber) {
      reset();
      return ToastMsg(
        "Please enter a new phone number that is different from your current one.",
        "warning"
      );
    }
    setFormLoading(true);
    console.log("Updating your phone number data: ", formData);
    try {
      const { phoneNumber } = formData;
      const response = await updatePhoneNumberFunction(userEmail, phoneNumber);
      //console.log(response);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        dispatch(updatePhoneNumber(phoneNumber));
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      reset();
      setFormLoading(false);
    }
  };

  return (
    <form
      name="update-phone-number-form"
      className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 md:flex"
      onSubmit={handleSubmit(handlePhoneNoUpdate)}
      noValidate
    >
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-gray-700 mb-4">
          Update Phone Number
        </h1>
        <div className="text-sm font-normal text-gray-500 text-left max-w-[500px]">
          Updating your phone number will facilitate easier communication with
          other users on this website. Rest assured, your phone number will not
          be displayed publicly without your explicit consent.
        </div>
      </div>

      <div>
        <div className="mb-4 px-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="phoneNumber"
          >
            Phone Number:
            <FaAsterisk className="text-red-500 ml-1" size={"8px"} />
          </label>
          <input
            className={`form-control w-full md:w-[240px] p-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            name="phoneNumber"
            type="text"
            id="phoneNumber"
            placeholder="Phone number e.g., 8072XXXXXX"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phoneNumber && (
            <div className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </div>
          )}
        </div>

        <div className="mt-3 text-left px-2">
          <button
            type="submit"
            disabled={formLoading}
            className={`btnSubmit px-4 py-2 text-sm bg-blue-500 text-white rounded-md ${
              formLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {formLoading ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePhoneNumberForm;
