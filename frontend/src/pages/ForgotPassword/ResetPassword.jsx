import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaAsterisk, FaSpinner } from "react-icons/fa";
import { ToastMsg } from "../../constants";

import { resetPasswordFunction } from "../../services/API";
import { resettingPasswordDone } from "../../actions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.resetPasswordState.userEmail);

  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //setValue,
    //watch,
    reset,
  } = useForm();

  const handleResetPassword = async (formData) => {
    //console.log(formData, email);
    const { newPassword, confirmPassword } = formData;
    setFormLoading(true);

    if (newPassword != confirmPassword) {
      ToastMsg("Passwords dont match!", "error");
      setFormLoading(false);
      return;
    }

    try {
      const response = await resetPasswordFunction(email, newPassword);
      //console.log(response);
      if (response.status == 200) {
        ToastMsg(response.data.message, "success");

        dispatch(resettingPasswordDone());
        navigate("/login");
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
    <div className="login-area w-full flex justify-center items-center pt-[80px] sm:pt-[50px] pb-[50px]">
      {/* Login box */}
      <div className="box sm:w-full md:max-w-[550px] mx-auto sm:py-[50px]">
        <h2 className="text-gray-700 outline-none block text-[40px] xl:text-[44px] font-bold mx-auto mb-3 w-full text-center">
          Reset Password
        </h2>
        <p className="text-sm font-normal text-gray-500 text-center mb-5">
          You can now reset your password. Please ensure that you choose a
          strong and memorable password.
        </p>
        <form
          name="login-form"
          className="w-full"
          onSubmit={handleSubmit(handleResetPassword)}
          noValidate
        >
          {/* New Password */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="newPassword"
            >
              New Password:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${errors.otp ? "border-red-500" : ""}`}
              name="New Password"
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.newPassword && (
              <div className="invalid-feedback">
                {errors.newPassword.message}
              </div>
            )}
          </div>

          {/* Confirm Passwrod */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="confirmPassword"
            >
              Confirm Password:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${errors.otp ? "border-red-500" : ""}`}
              name="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Re-enter password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
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
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
