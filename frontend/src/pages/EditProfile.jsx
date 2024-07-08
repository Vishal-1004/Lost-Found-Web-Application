import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";
import ToastMsg from "../constants/ToastMsg";
import {
  updateHostelerOrDayscholarFunction,
  updatePhoneNumberFunction,
} from "../services/API";
import { useSelector } from "react-redux";

// updating phone number function
const UpdatePhoneNumberForm = () => {
  // getting user email from localstorage
  const userEmail = useSelector((state) => state.storedUserData.userEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formLoading, setFormLoading] = useState(false);

  const handlePhoneNoUpdate = async (formData) => {
    setFormLoading(true);
    console.log("Updating your phone number data: ", formData);
    try {
      const { phoneNumber } = formData;
      const response = await updatePhoneNumberFunction(userEmail, phoneNumber);
      console.log(response);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
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
      className="w-[80%] md:w-[50%] lg:w-[40%]"
      onSubmit={handleSubmit(handlePhoneNoUpdate)}
      noValidate
    >
      <div className="mb-3 max-w-[500px] px-2">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="phoneNumber"
        >
          Phone Number:
          <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <input
          className={`form-control w-full ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
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
          <div className="invalid-feedback text-red-500 text-sm">
            {errors.phoneNumber.message}
          </div>
        )}
      </div>

      <div className="mt-3 text-left px-2">
        <button
          type="submit"
          disabled={formLoading}
          className={`btnSubmit px-2 py-2 !text-xs bg-blue-500 text-white rounded ${
            formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {formLoading ? (
            <>
              <FaSpinner className="mr-3 animate-spin" />
              Loading...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

// updating hosteler or day scholar functio
const UpdateHostelerDayScholarForm = () => {
  // getting user email from localstorage
  const userEmail = useSelector((state) => state.storedUserData.userEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formLoading, setFormLoading] = useState(false);

  const handleHostelerDayScholarUpdate = async (formData) => {
    setFormLoading(true);
    //console.log("Updating your hosteler or day scholar data: ", formData);
    try {
      const { dayScholarORhosteler } = formData;
      const response = await updateHostelerOrDayscholarFunction(
        userEmail,
        dayScholarORhosteler
      );
      console.log(response);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
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
      name="update-hosteler-day-scholar-form"
      className="w-[80%] md:w-[50%] lg:w-[40%]"
      onSubmit={handleSubmit(handleHostelerDayScholarUpdate)}
      noValidate
    >
      <div className="mb-3 w-full md:w-1/2 px-2">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="dayScholarORhosteler"
        >
          Hosteller/Day Scholar:
          <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <select
          className={`form-control ${
            errors.dayScholarORhosteler ? "border-red-500" : ""
          }`}
          name="dayScholarORhosteler"
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
          <div className="invalid-feedback text-red-500 text-sm">
            {errors.dayScholarORhosteler.message}
          </div>
        )}
      </div>

      <div className="mt-3 text-left px-2">
        <button
          type="submit"
          disabled={formLoading}
          className={`btnSubmit px-2 py-2 !text-xs bg-blue-500 text-white rounded ${
            formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {formLoading ? (
            <>
              <FaSpinner className="mr-3 animate-spin" />
              Loading...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

// updating password function
const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formLoading, setFormLoading] = useState(false);

  const handlePasswrodUpdate = (formData) => {
    setFormLoading(true);
    console.log("Updating your password data: ", formData);
    // Simulate an API call
    setTimeout(() => {
      setFormLoading(false);
      reset();
    }, 2000);
  };

  return (
    <form
      name="update-hosteler-day-scholar-form"
      className="w-[80%] md:w-[50%] lg:w-[40%]"
      onSubmit={handleSubmit(handlePasswrodUpdate)}
      noValidate
    >
      <div className="flex flex-wrap -mx-2 px-2">
        {/* Old Password */}
        <div className="mb-3 w-full md:w-1/2 px-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="oldPassword"
          >
            Old Password:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control ${
              errors.oldPassword ? "border-red-500" : ""
            }`}
            name="OldPassword"
            type="password"
            id="oldPassword"
            placeholder="Password"
            {...register("oldPassword", {
              required: "Old Password is required",
              minLength: {
                value: 6,
                message: "Old Password must be at least 6 characters long",
              },
            })}
          />
          {errors.oldPassword && (
            <div className="invalid-feedback">{errors.oldPassword.message}</div>
          )}
        </div>

        {/* New password */}
        <div className="mb-3 w-full md:w-1/2 px-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="password"
          >
            New Password:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control ${
              errors.password ? "border-red-500" : ""
            }`}
            name="New Password"
            type="password"
            id="password"
            placeholder="New Password"
            {...register("password", {
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "New Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
      </div>

      <div className="mt-3 text-left px-2">
        <button
          type="submit"
          disabled={formLoading}
          className={`btnSubmit px-2 py-2 !text-xs bg-blue-500 text-white rounded ${
            formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {formLoading ? (
            <>
              <FaSpinner className="mr-3 animate-spin" />
              Loading...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

const EditProfile = () => {
  return (
    <div className="px-4 mb-5 sm:px-12">
      {/* Updating phone number info */}
      <div>
        <h1 className="text-[24px] text-left font-bold text-gray-700 my-3">
          Update Phone Number
        </h1>
        <div className="w-fit md:flex md:justify-around">
          <div className="text-normal font-normal text-gray-500 text-left max-w-[500px]">
            Updating your phone number will facilitate easier communication with
            other users on this website. Rest assured, your phone number will
            not be displayed publicly without your explicit consent.
          </div>
          <UpdatePhoneNumberForm />
        </div>
      </div>

      {/* Updating hosteler or day scholar info */}
      <div>
        <h1 className="text-[24px] text-left font-bold text-gray-700 my-3">
          Update Hosteler/Day Scholar
        </h1>
        <div className="w-fit md:flex md:justify-around">
          <div className="text-normal font-normal text-gray-500 text-left max-w-[500px]">
            Students often switch between being hostelers and day scholars.
            Please update your status accordingly. Ensure that the information
            provided is accurate, as it will facilitate contact in case of lost
            or found items.
          </div>
          <UpdateHostelerDayScholarForm />
        </div>
      </div>

      {/* Updating password info */}
      <div>
        <h1 className="text-[24px] text-left font-bold text-gray-700 my-3">
          Update Password
        </h1>
        <div className="w-fit md:flex md:justify-around">
          <div className="text-normal font-normal text-gray-500 text-left max-w-[500px]">
            You can update your password here. Please ensure you remember your
            current password to proceed with the update. After updating, be
            careful not to forget your new password.
          </div>
          <UpdatePasswordForm />
        </div>
      </div>

      {/* Delete your account */}
      <div>
        <h1 className="text-[24px] text-left font-bold text-red-700 my-3">
          Delete Account
        </h1>
        <div className="w-fit md:flex md:justify-around">
          <div className="text-normal font-normal text-red-500 text-left max-w-[500px]">
            Please be certain before deleting your account, as all your data,
            including any lost/found posts you have created, will be permanently
            removed from the website. If you wish to use the website again in
            the future, you will need to create a new account.
          </div>
          <div className="mt-3 text-left px-2">
            <button
              type="submit"
              className="btnSubmit px-2 py-2 !text-xs bg-red-500 text-white rounded
            hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
