import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ToastMsg from "../../constants/ToastMsg";
import { updateHostelerOrDayscholarFunction } from "../../services/API";
import { updateDayScholarORhosteler } from "../../actions";
import { FaAsterisk, FaSpinner } from "react-icons/fa";

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
        <div className="text-sm font-normal text-gray-500 text-left max-w-[500px]">
          Students often switch between being hostelers and day scholars. Please
          update your status accordingly. Ensure that the information provided
          is accurate, as it will facilitate contact in case of lost or found
          items.
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

export default UpdateHostelerDayScholarForm;
