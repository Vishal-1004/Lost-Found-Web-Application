import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { FaAsterisk, FaSpinner } from "react-icons/fa";
import { ToastMsg } from "../../constants";

import { verifyOtpFucntion } from "../../services/API";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //setValue,
    //watch,
    reset,
  } = useForm();

  const handleVerifyOTP = async (formData) => {
    //console.log(formData, email);
    setFormLoading(true);
    try {
      const { otp } = formData;
      const response = await verifyOtpFucntion(email, otp);
      //console.log(response);
      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        navigate("/reset-password", { state: { email } });
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      setFormLoading(false);
      reset();
    }
  };

  return (
    <div className="login-area w-screen flex justify-center items-center pt-[80px] sm:pt-[50px] pb-[50px]">
      {/* Login box */}
      <div className="box sm:w-full md:max-w-[550px] mx-auto sm:py-[50px]">
        <h2 className="text-gray-700 outline-none block text-[40px] xl:text-[44px] font-bold mx-auto mb-3 w-full text-center">
          Verify OTP
        </h2>
        <p className="text-sm font-normal text-gray-500 text-center mb-5">
          An OTP has been sent to your email: {email}. Please enter it here to
          verify your identity and proceed with resetting your password.
        </p>
        <form
          name="login-form"
          className="w-full"
          onSubmit={handleSubmit(handleVerifyOTP)}
          noValidate
        >
          {/* VIT Email */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="otp"
            >
              Enter OTP:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${errors.otp ? "border-red-500" : ""}`}
              name="OTP"
              type="text"
              id="otp"
              placeholder="XXXXXX"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[A-Za-z0-9]{6}$/,
                  message:
                    "Invalid OTP, it should be a 6-character alphanumeric string",
                },
              })}
            />
            {errors.otp && (
              <div className="invalid-feedback">{errors.otp.message}</div>
            )}
          </div>

          {/* Login button */}
          <div className="mt-5 text-center">
            <button
              type="submit"
              disabled={formLoading}
              className={`btnSubmit ${
                formLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {formLoading ? (
                <>
                  <FaSpinner className="mr-3 animate-spin" />
                  Loading...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
