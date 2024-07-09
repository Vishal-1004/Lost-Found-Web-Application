import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";
import ToastMsg from "../constants/ToastMsg";
import {
  updateHostelerOrDayscholarFunction,
  updatePhoneNumberFunction,
} from "../services/API";
import { useDispatch, useSelector } from "react-redux";
import { updateDayScholarORhosteler, updatePhoneNumber } from "../actions";

// Updating phone number function
const UpdatePhoneNumberForm = () => {
  const dispatch = useDispatch();

  // Getting user email from localstorage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  // Getting user current phone number
  const userPhoneNumber = useSelector(
    (state) => state.storedUserData.userData.userPhoneNumber
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formLoading, setFormLoading] = useState(false);

  const handlePhoneNoUpdate = async (formData) => {
    if (formData.phoneNumber == userPhoneNumber) {
      reset();
      return ToastMsg(
        "Please enter a new phone number that is different from your current one.",
        "warning"
      );
    }
    setFormLoading(true);
    console.log("Updating your phone number data: ", formData);
    try {
      const { phoneNumber } = formData;
      const response = await updatePhoneNumberFunction(userEmail, phoneNumber);
      //console.log(response);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        dispatch(updatePhoneNumber(phoneNumber));
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
      className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 md:flex"
      onSubmit={handleSubmit(handlePhoneNoUpdate)}
      noValidate
    >
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-gray-700 mb-4">
          Update Phone Number
        </h1>
        <div 
          className="text-sm font-normal text-gray-500 text-left max-w-[500px]"
        >
          Updating your phone number will facilitate easier communication with
          other users on this website. Rest assured, your phone number will
          not be displayed publicly without your explicit consent.
        </div>
      </div>

      <div>
        <div className="mb-4 px-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="phoneNumber"
          >
            Phone Number:
            <FaAsterisk className="text-red-500 ml-1" size={"8px"} />
          </label>
          <input
            className={`form-control w-full md:w-[240px] p-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md`}
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
            <div className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </div>
          )}
        </div>

        <div className="mt-3 text-left px-2">
          <button
            type="submit"
            disabled={formLoading}
            className={`btnSubmit px-4 py-2 text-sm bg-blue-500 text-white rounded-md ${
              formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {formLoading ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

// Updating hosteler or day scholar function
const UpdateHostelerDayScholarForm = () => {
  const dispatch = useDispatch();

  // Getting user email from localstorage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  // Getting user current hosteler/day scholar information
  const userDayScholarORhosteler = useSelector(
    (state) => state.storedUserData.userData.userDayScholarORhosteler
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formLoading, setFormLoading] = useState(false);

  const handleHostelerDayScholarUpdate = async (formData) => {
    if (userDayScholarORhosteler == formData.dayScholarORhosteler) {
      reset();
      return ToastMsg(
        "Please select a different category if your status has changed from 'Day Scholar' to 'Hosteler' or vice versa.",
        "warning"
      );
    }
    setFormLoading(true);
    //console.log("Updating your hosteler or day scholar data: ", formData);
    try {
      const { dayScholarORhosteler } = formData;
      const response = await updateHostelerOrDayscholarFunction(
        userEmail,
        dayScholarORhosteler
      );
      //console.log(response);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        dispatch(updateDayScholarORhosteler(dayScholarORhosteler));
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
      className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 md:flex"
      onSubmit={handleSubmit(handleHostelerDayScholarUpdate)}
      noValidate
    >
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-gray-700 mb-4">
          Update Hosteler/Day Scholar
        </h1>
        <div 
          className="text-sm font-normal text-gray-500 text-left max-w-[500px]"
        >
          Students often switch between being hostelers and day scholars.
          Please update your status accordingly. Ensure that the information
          provided is accurate, as it will facilitate contact in case of lost
          or found items.
        </div>
      </div>

      <div>
        <div className="mb-4 px-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="dayScholarORhosteler"
          >
            Hosteler/Day Scholar:
            <FaAsterisk className="text-red-500 ml-1" size={"8px"} />
          </label>
          <select
            className={`form-control w-full md:w-[240px] p-2 border ${
              errors.dayScholarORhosteler ? "border-red-500" : "border-gray-300"
            } rounded-md`}
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
            <div className="text-red-500 text-sm mt-1">
              {errors.dayScholarORhosteler.message}
            </div>
          )}
        </div>

        <div className="mt-3 text-left px-2">
          <button
            type="submit"
            disabled={formLoading}
            className={`btnSubmit px-4 py-2 text-sm bg-blue-500 text-white rounded-md ${
              formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {formLoading ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

// Updating password function
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
      name="update-password-form"
      className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 md:flex"
      onSubmit={handleSubmit(handlePasswrodUpdate)}
      noValidate
    >
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-gray-700 mb-4">
          Update Password
        </h1>
        <div 
          className="text-sm font-normal text-gray-500 text-left max-w-[1100px]"
        >
          You can update your password here. Please ensure you remember your
          current password to proceed with the update. After updating, be
          careful not to forget your new password.
        </div>
      </div>

      <div>
        <div className="flex flex-wrap -mx-2 px-2">
          {/* Old Password */}
          <div className="mb-4 w-full md:w-[220px] px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="oldPassword"
            >
              Old Password:{" "}
              <FaAsterisk className="text-red-500 ml-1" size={"8px"} />
            </label>
            <input
              className={`form-control w-full md:w-[240px] p-2 border ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              name="oldPassword"
              type="password"
              id="oldPassword"
              placeholder="Password"
              {...register("oldPassword", {
                required: "Old password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.oldPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.oldPassword.message}
              </div>
            )}
          </div>

          {/* New Password */}
          <div className="mb-4 w-full md:w-[220px] px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="newPassword"
            >
              New Password:{" "}
              <FaAsterisk className="text-red-500 ml-1" size={"8px"} />
            </label>
            <input
              className={`form-control w-full md:w-[240px] p-2 border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="New Password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.newPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="mb-4 w-full md:w-[220px] px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="confirmNewPassword"
            >
              Confirm New Password:{" "}
              <FaAsterisk className="text-red-500 ml-1" size={"8px"} />
            </label>
            <input
              className={`form-control w-full md:w-[240px] p-2 border ${
                errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              {...register("confirmNewPassword", {
                required: "Confirm password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: (value, { newPassword }) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            {errors.confirmNewPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.confirmNewPassword.message}
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 text-left px-2">
          <button
            type="submit"
            disabled={formLoading}
            className={`btnSubmit px-4 py-2 text-sm bg-blue-500 text-white rounded-md ${
              formLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {formLoading ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

// Deleting account function
const DeleteAccount = () => {
  return(
    <div className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 flex md:items-center gap-4 md:gap-0 justify-center md:justify-start">
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-red-600 mb-4 mt-4 md:mt-0">
          Delete Account
        </h1>
        <div 
          className="text-sm font-normal text-red-500 text-left max-w-[420px]"
        >
          Please be certain before deleting your account, as all your data,
          including any lost/found posts you have created, will be permanently
          removed from the website. If you wish to use the website again in
          the future, you will need to create a new account.
        </div>
      </div>

      <div className="mt-3 text-left px-2">
        <button
          type="submit"
          className="btnSubmit px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

const EditProfile = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Edit Profile</h2>
      
      <div className="space-y-10">
        <UpdatePhoneNumberForm />
        <UpdateHostelerDayScholarForm />
        <UpdatePasswordForm />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default EditProfile;
