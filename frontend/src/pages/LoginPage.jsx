import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FaAsterisk, FaSpinner } from "react-icons/fa";

import ToastMsg from "../constants/ToastMsg";
import "../style/Login&SignUp/Login.css";

import { loginFunction } from "../services/API";

import { storeUserData } from "../actions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  // User Login Function
const handleLogin = async (formData) => {
  //console.log(formData);
  setFormLoading(true);
  try {
    const { registrationNo, password } = formData;
    const response = await loginFunction(registrationNo, password);
    console.log(response);

    if (response.status === 200) {
      const userToken = response.data.userToken;
      const userStatus = response.data.userData.status;
      const userData = {
        userName: response.data.userData.name,
        userEmail: response.data.userData.email,
        userRegistrationNo: response.data.userData.registrationNo,
        userPhoneNumber: response.data.userData.phoneNumber,
        userDayScholarORhosteler: response.data.userData.dayScholarORhosteler,
        notifications: response.data.userData.notifications,
      };

      ToastMsg(response.data.message, "success");

      // Store user data in Redux store
      dispatch(storeUserData(userToken, userStatus, userData));

      // Navigate to home page
      navigate("/");
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

  // Capitalize the registration no.
  const registrationNo = watch("registrationNo");
  useEffect(() => {
    setValue("registrationNo", registrationNo?.toUpperCase());
  }, [registrationNo, setValue]);

  return (
    <div className="login-area w-full flex justify-center items-center pt-[80px] sm:pt-[50px] pb-[50px]">
      {/* Login box */}
      <div className="box sm:w-full md:max-w-[480px] mx-auto sm:py-[50px]">
        <h2 className="text-gray-700 outline-none block text-[40px] xl:text-[44px] font-bold mx-auto mb-3 w-full text-center">
          Login
        </h2>
        <form
          name="login-form"
          className="w-full"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          {/*Registration number */}
          <div className="mb-3 w-full px-2">
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
              placeholder="Registration No"
              {...register("registrationNo", {
                required: "Registration number is required",
                pattern: {
                  value:
                    /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$|^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
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

          {/* Password */}
          <div className="mb-3 w-full px-2">
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
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Forgot Password */}
          <div className="mb-3 w-full px-2 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login button */}
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
                "Login"
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
}

export default Login;
