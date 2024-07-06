import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { FaAsterisk, FaSpinner } from "react-icons/fa";
import { ToastMsg } from "../../constants";

import { verifyEmailFunction } from "../../services/API";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //setValue,
    //watch,
    reset,
  } = useForm();

  const handleVerifyEmail = async (formData) => {
    //console.log(formData);
    setFormLoading(true);
    try {
      const { email } = formData;

      const response = await verifyEmailFunction(email);
      //console.log(response);
      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        navigate("/verify-otp", { state: { email } });
      } else {
        ToastMsg(response.response.data.message, "error");
        //console.log(response);
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
          Verify Email
        </h2>
        <p className="text-sm font-normal text-gray-500 text-center mb-5">
          To proceed with resetting your password, kindly provide your college
          email address. This step is necessary to verify your identity and
          ensure the security of your account.
        </p>
        <form
          name="login-form"
          className="w-full"
          onSubmit={handleSubmit(handleVerifyEmail)}
          noValidate
        >
          {/* VIT Email */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="email"
            >
              VIT Email:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${errors.email ? "border-red-500" : ""}`}
              name="Email"
              type="text"
              id="email"
              placeholder="eg: vishalkumar.yadav2021a@vitstudent.ac.in"
              {...register("email", {
                required: "College Email is required",
                pattern: {
                  value:
                    /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$|^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
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
                "Send OTP"
              )}
            </button>
          </div>

          {/* Signup */}
          <div className="mt-3 text-center">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
