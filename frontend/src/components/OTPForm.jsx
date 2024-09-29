import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAsterisk, FaSpinner } from 'react-icons/fa';

import ToastMsg from "../constants/ToastMsg";

function OTPForm({ onClose }) {
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
    // setFormLoading(true);
    console.log(formData);
    ToastMsg("OTP submitted successfully", "success");
    onClose();
  };

  return (
    <form 
      className='w-full'
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
          OTP:{" "}
          <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <input
          className={`form-control text-gray-500 ${errors.otp ? 'border-red-500' : ''}`}
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
          <div className="invalid-feedback text-red-500 text-sm" role="alert" aria-live="assertive">
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
            formLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {formLoading ? (
            <>
              <FaSpinner className="mr-3 animate-spin" />
              Verifying...
            </>
          ) : (
            'Submit OTP'
          )}
        </button>
      </div>
    </form>
  );
}

export default OTPForm;
