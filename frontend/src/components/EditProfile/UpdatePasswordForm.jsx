import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";
import ToastMsg from "../../constants/ToastMsg";
import { updatePasswordFunction } from "../../services/API";
import { useSelector } from "react-redux";

const UpdatePasswordForm = () => {
  // Getting user email from localstorage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formLoading, setFormLoading] = useState(false);

  const handlePasswrodUpdate = async (formData) => {
    setFormLoading(true);
    const { oldPassword, newPassword, confirmNewPassword } = formData;

    if (newPassword != confirmNewPassword) {
      return ToastMsg("New password & Confirm Password should be same!");
    }
    try {
      const response = await updatePasswordFunction(
        userEmail,
        oldPassword,
        newPassword
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
      name="update-password-form"
      className="w-full max-w-lg md:max-w-2xl mx-auto mb-6 md:flex"
      onSubmit={handleSubmit(handlePasswrodUpdate)}
      noValidate
    >
      <div className="hidden md:block">
        <h1 className="text-xl text-left font-bold text-gray-700 mb-4">
          Update Password
        </h1>
        <div className="text-sm font-normal text-gray-500 text-left max-w-[1100px]">
          You can update your password here. Please ensure you remember your
          current password to proceed with the update. After updating, be
          careful not to forget your new password.
        </div>
      </div>

      <div>
        <div className="flex flex-wrap -mx-2 px-2">
          {/* Current Password */}
          <div className="mb-4 w-full md:w-[220px] px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="oldPassword"
            >
              Current Password:{" "}
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
              formLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
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

export default UpdatePasswordForm;
