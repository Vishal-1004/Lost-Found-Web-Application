import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";

import "../style/Login&SignUp/SignUp.css";

import { ToastMsg } from "../constants";
import { signupFunction } from "../services/API";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formLoading, setFormLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); // subscription state

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const handleSignUp = async (formData) => {
    setFormLoading(true);
    if (formData.password !== formData.confirm_password) {
      ToastMsg("Passwords & Confirm Password do not match!", "error");
      return;
    }
    try {
      const { name, email, password, registrationNo, dayScholarORhosteler } =
        formData;

      const response = await signupFunction(
        name,
        email,
        password,
        registrationNo,
        dayScholarORhosteler
      );
      //console.log(response);
      if (response.status == 200) {
        ToastMsg(response.data.message, "success");

        // Navigate to login page
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

    // Check if the user has subscribed
    if (isSubscribed) {
      console.log("User subscribed to lost post notifications via email");
    } else {
      console.log("User did not subscribe");
    }

    //console.log(formData);
  };

  // Capitalize the registration number
  const RegNo = watch("registrationNo");
  useEffect(() => {
    setValue("registrationNo", RegNo?.toUpperCase());
  }, [RegNo, setValue]);

  // Making the email lower cased
  const Email = watch("email");
  useEffect(() => {
    setValue("email", Email?.toLowerCase());
  }, [Email, setValue]);

  return (
    <div className="signup-area flex justify-center items-center pt-[80px] sm:pt-[50px] pb-[50px]">
      {/* Signup box */}
      <div className="box sm:w-full md:max-w-[740px] mx-auto md:py-[50px]">
        <h2 className="text-gray-700 outline-none block text-[40px] xl:text-[44px] font-bold mx-auto mb-3 w-full text-center">
          Sign Up
        </h2>
        <form
          name="signup-form"
          className="w-full"
          onSubmit={handleSubmit(handleSignUp)}
          noValidate
        >
          <div className="flex flex-wrap -mx-2 px-2">
            {/* Name */}
            <div className="mb-3 w-full md:w-1/2 px-2">
              <label
                className="text-sm font-medium text-gray-700 flex items-center"
                htmlFor="name"
              >
                Name:{" "}
                <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
              </label>
              <input
                className={`form-control ${
                  errors.name ? "border-red-500" : ""
                }`}
                name="Name"
                type="text"
                id="name"
                placeholder="eg: Vishal Kumar Yadav"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Invalid name",
                  },
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* Registration number */}
            <div className="mb-3 w-full md:w-1/2 px-2">
              <label
                className="text-sm font-medium text-gray-700 flex items-center"
                htmlFor="registrationNo"
              >
                Registration No:{" "}
                <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
              </label>
              <input
                className={`form-control ${
                  errors.registrationNo ? "border-red-500" : ""
                }`}
                name="Registration No"
                type="text"
                id="registrationNo"
                placeholder="eg: 21BCE1846"
                {...register("registrationNo", {
                  required: "Registration number is required",
                  pattern: {
                    value: /^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                    message: "Invalid registration number",
                  },
                })}
              />
              {errors.registrationNo && (
                <div className="invalid-feedback">
                  {errors.registrationNo.message}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3 w-full  px-2">
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
              type="email"
              id="email"
              placeholder="eg: vishalkumar.yadav2021a@vitstudent.ac.in"
              {...register("email", {
                required: "VIT email is required",
                pattern: {
                  value:
                    /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Hosteller or Day scholar */}
          <div className="mb-3 w-full md:w-1/2 px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="dayScholarORhosteler"
            >
              Hosteller/Day Scholar:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <select
              className={`form-control ${
                errors.dayScholarORhosteler ? "border-red-500" : ""
              }`}
              name="Hosteller/Day Scholar"
              id="dayScholarORhosteler"
              {...register("dayScholarORhosteler", {
                required: "This field is required",
              })}
            >
              <option value="">Select an option</option>
              <option value="Hosteler">Hosteller</option>
              <option value="Day Scholar">Day Scholar</option>
            </select>
            {errors.dayScholarORhosteler && (
              <div className="invalid-feedback">
                {errors.dayScholarORhosteler.message}
              </div>
            )}
          </div>

          <div className="flex flex-wrap -mx-2 px-2">
            {/* Password */}
            <div className="mb-3 w-full md:w-1/2 px-2">
              <label
                className="text-sm font-medium text-gray-700 flex items-center"
                htmlFor="password"
              >
                Password:{" "}
                <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
              </label>
              <input
                className={`form-control ${
                  errors.password ? "border-red-500" : ""
                }`}
                name="Password"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="mb-3 w-full md:w-1/2 px-2">
              <label
                className="text-sm font-medium text-gray-700 flex items-center"
                htmlFor="confirm_password"
              >
                Confirm Password:{" "}
                <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
              </label>
              <input
                className={`form-control ${
                  errors.confirm_password ? "border-red-500" : ""
                }`}
                name="Confirm Password"
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.confirm_password && (
                <div className="invalid-feedback">
                  {errors.confirm_password.message}
                </div>
              )}
            </div>

            {/* Subscribe to notifications */}
            <div className="mb-3 w-full px-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="mr-2"
                  checked={isSubscribed}
                  onChange={() => setIsSubscribed(!isSubscribed)}
                />
                Subscribe to lost post notifications
              </label>
            </div>
          </div>

          {/* Signup button */}
          <div className="mt-3 text-center">
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
                "Sign Up"
              )}
            </button>
          </div>

          {/* Login */}
          <div className="mt-3 text-center">
            <p className="text-sm">
              Allready have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
