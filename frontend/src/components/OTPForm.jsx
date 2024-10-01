import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from "prop-types";
import { FaAsterisk, FaSpinner } from "react-icons/fa";

import ToastMsg from "../constants/ToastMsg";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTPToReceiveFoundItem } from "../services/API";
import { tryFetchingData } from "../actions";

function OTPForm({ onClose, returnDetails }) {
  const dispatch = useDispatch();

  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  // Handle OTP form submission
  const handleOtpSubmit = async (formData) => {
    setFormLoading(true);
    try {
      const {
        returnedName,
        returnedRegNo,
        returnedEmail,
        dayScholarORhosteler,
        returnedPhoneNumber,
        id,
      } = returnDetails;
      const { otp } = formData;

      const response = await verifyOTPToReceiveFoundItem(
        otp,
        userEmail,
        id,
        returnedEmail,
        returnedName,
        returnedRegNo,
        returnedPhoneNumber,
        dayScholarORhosteler
      );

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        dispatch(tryFetchingData());
      } else {
        ToastMsg(response.response.data.message, "success");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      reset();
      onClose();
      setFormLoading(false);
    }
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(handleOtpSubmit)}
      noValidate
    >
      <div className="mb-3 text-sm sm:text-md font-semibold text-red-400 text-center">
        <p>An OTP has been sent to your email.</p>
        <p>Please enter it in the field given below to verify.</p>
      </div>
      {/* OTP input field */}
      <div className="mb-3">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="otp"
        >
          OTP: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <input
          className={`form-control text-gray-500 ${
            errors.otp ? "border-red-500" : ""
          }`}
          name="otp"
          type="text"
          id="otp"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter 6-digit OTP"
          {...register("otp", {
            required: "This field is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "OTP must be 6 digits",
            },
          })}
        />
        {errors.otp && (
          <div
            className="invalid-feedback text-red-500 text-sm"
            role="alert"
            aria-live="assertive"
          >
            {errors.otp.message}
          </div>
        )}
      </div>

      {/* Submit button */}
      <div className="mt-3 text-center">
        <button
          type="submit"
          disabled={formLoading}
          className={`btnSubmit px-4 py-2 bg-blue-500 text-white rounded ${
            formLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {formLoading ? (
            <>
              <FaSpinner className="mr-3 animate-spin" />
              Verifying...
            </>
          ) : (
            "Submit OTP"
          )}
        </button>
      </div>
    </form>
  );
}

// Prop validation
OTPForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  returnDetails: PropTypes.shape({
    returnedName: PropTypes.string.isRequired,
    returnedRegNo: PropTypes.string.isRequired,
    returnedEmail: PropTypes.string.isRequired,
    dayScholarORhosteler: PropTypes.string.isRequired,
    returnedPhoneNumber: PropTypes.string, // Assuming it's optional, set as .isRequired if needed
    id: PropTypes.string.isRequired, // If 'id' is always a string, otherwise use appropriate type
  }).isRequired,
};

export default OTPForm;
