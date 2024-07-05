import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";
import "../style/Login&SignUp/Login.css";
import ToastMsg from "../constants/ToastMsg";
import { Link } from "react-router-dom";

function Login() {
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    ToastMsg("Login Successful!", "success");
    // console.log("Success")
    reset();
  };

  const emailOrRegNo = watch("email_or_reg_no");

  // Capitalize the registration no./email
  useEffect(() => {
    setValue("email_or_reg_no", emailOrRegNo?.toUpperCase());
  }, [emailOrRegNo, setValue]);

  return (
    <div className="login-area flex justify-center items-center pt-[80px] sm:pt-[50px] pb-[50px]">
      {/* Login box */}
      <div className="box sm:w-full md:max-w-[480px] mx-auto sm:py-[50px]">
        <h2 className="text-gray-700 outline-none block text-[40px] xl:text-[44px] font-bold mx-auto mb-3 w-full text-center">
          Login
        </h2>
        <form
          name="login-form"
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email or Registration number */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="email_or_reg_no"
            >
              Email/Registration No:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${
                errors.email_or_reg_no ? "border-red-500" : ""
              }`}
              name="Email/Registration No"
              type="text"
              id="email_or_reg_no"
              placeholder="Email or Registration No"
              {...register("email_or_reg_no", {
                required: "Email or registration number is required",
                pattern: {
                  value:
                    /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$|^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                  message: "Invalid email or registration number",
                },
              })}
            />
            {errors.email_or_reg_no && (
              <div className="invalid-feedback">
                {errors.email_or_reg_no.message}
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
                  value: 8,
                  message: "Password must be at least 8 characters long",
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
              to="/sign-up"
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
              Don't have an account?{" "}
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

export default Login;
