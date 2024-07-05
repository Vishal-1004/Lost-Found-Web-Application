import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";
import "../style/Login&SignUp/SignUp.css";
import { ToastMsg } from "../constants";

const SignUp = () => {
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    if (formData.password !== formData.confirm_password) {
      ToastMsg("Passwords do not match!", "error");
    //   console.log("Error")
      return;
    }
    
    ToastMsg("Signup Successful!", "success");
    // console.log("Succes")
    reset();
  };

  const RegNo = watch("reg_no");
  const Email = watch("email");

  // Capitalize the registration number
  useEffect(() => {
    setValue("reg_no", RegNo?.toUpperCase());
  }, [RegNo, setValue]);
  
  // Making the email lower cased
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
          onSubmit={handleSubmit(onSubmit)}
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
                className={`form-control ${errors.name ? "border-red-500" : ""}`}
                name="Name"
                type="text"
                id="name"
                placeholder="Name"
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
                htmlFor="reg_no"
              >
                Registration No:{" "}
                <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
              </label>
              <input
                className={`form-control ${
                  errors.reg_no ? "border-red-500" : ""
                }`}
                name="Registration No"
                type="text"
                id="reg_no"
                placeholder="eg: 22BCE1411"
                {...register("reg_no", {
                  required: "Registration number is required",
                  pattern: {
                    value: /^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                    message: "Invalid registration number",
                  },
                })}
              />
              {errors.reg_no && (
                <div className="invalid-feedback">{errors.reg_no.message}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="email"
            >
              Email:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${errors.email ? "border-red-500" : ""}`}
              name="Email"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
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
          <div className="mb-3 w-full md:w-2/3 px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="hostel_day"
            >
              Hosteller/Day Scholar:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <select
              className={`form-control ${
                errors.hostel_day ? "border-red-500" : ""
              }`}
              name="Hosteller/Day Scholar"
              id="hostel_day"
              {...register("hostel_day", {
                required: "This field is required",
              })}
            >
              <option value="">Select an option</option>
              <option value="hosteller">Hosteller</option>
              <option value="day_scholar">Day Scholar</option>
            </select>
            {errors.hostel_day && (
              <div className="invalid-feedback">
                {errors.hostel_day.message}
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
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
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
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.confirm_password && (
                <div className="invalid-feedback">
                  {errors.confirm_password.message}
                </div>
              )}
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
        </form>
      </div>
    </div>
  );
};

export default SignUp;
