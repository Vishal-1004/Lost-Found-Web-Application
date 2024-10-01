import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";

function ReturnForm({ onClose, onSubmit }) {
  const [formLoading, setFormLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      returnedName: "",
      returnedRegNo: "",
      returnedEmail: "",
      dayScholarORhosteler: "",
      returnedPhoneNumber: undefined,
    },
  });

  // on submit
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    // console.log(formData);
    //ToastMsg("OTP sent successfully", "success");

    onSubmit(formData);
  };

  // capitalize reg no
  const RegNo = watch("returnedRegNo");
  useEffect(() => {
    setValue("returnedRegNo", RegNo?.toUpperCase());
  }, [RegNo, setValue]);

  // puting range of input date ****************
  const currentDate = new Date().toISOString().split("T")[0];
  const lastYearDate = new Date();
  lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
  const lastYearDateString = lastYearDate.toISOString().split("T")[0];
  // *******************************************

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <div className="flex flex-wrap sm:flex-nowrap sm:gap-4">
        {/* name */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="returnedName"
          >
            Name: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-500 ${
              errors.returnedName ? "border-red-500" : ""
            }`}
            name="returnedName"
            type="text"
            id="returnedName"
            placeholder="ex: Shashank Sharma"
            {...register("returnedName", {
              required: "This field is required",
            })}
          />
          {errors.returnedName && (
            <div className="invalid-feedback">
              {errors.returnedName.message}
            </div>
          )}
        </div>

        {/* reg no */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="returnedRegNo"
          >
            Registration Number:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-500 ${
              errors.returnedRegNo ? "border-red-500" : ""
            }`}
            name="returnedRegNo"
            type="text"
            id="returnedRegNo"
            placeholder="ex: 22BCE1411"
            {...register("returnedRegNo", {
              required: "This field is required",
              pattern: {
                value: /^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                message: "Invalid registration number",
              },
            })}
          />
          {errors.returnedRegNo && (
            <div className="invalid-feedback">
              {errors.returnedRegNo.message}
            </div>
          )}
        </div>
      </div>

      {/* mail id */}
      <div className="mb-3">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="returnedEmail"
        >
          Email: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <input
          className={`form-control text-gray-500 ${
            errors.returnedEmail ? "border-red-500" : ""
          }`}
          name="returnedEmail"
          type="email"
          id="returnedEmail"
          placeholder="ex: shashank.sharma2022@vitstudent.ac.in"
          {...register("returnedEmail", {
            required: "This field is required",
            pattern: {
              value:
                /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.returnedEmail && (
          <div className="invalid-feedback">{errors.returnedEmail.message}</div>
        )}
      </div>

      <div className="flex flex-wrap sm:flex-nowrap sm:gap-4 items-center">
        {/* Hosteller or Day scholar */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="dayScholarORhosteler"
          >
            Hosteller/Day Scholar:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <select
            className={`form-control text-gray-500 ${
              errors.dayScholarORhosteler ? "border-red-500" : ""
            }`}
            name="Hosteller/Day Scholar"
            id="dayScholarORhosteler"
            {...register("dayScholarORhosteler", {
              required: "This field is required",
            })}
          >
            <option value="">Select an option</option>
            <option value="Hosteler">Hosteler</option>
            <option value="Day Scholar">Day Scholar</option>
          </select>
          {errors.dayScholarORhosteler && (
            <div className="invalid-feedback">
              {errors.dayScholarORhosteler.message}
            </div>
          )}
        </div>

        {/* phone number */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="returnedPhoneNumber"
          >
            Phone Number:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-500 ${
              errors.returnedPhoneNumber ? "border-red-500" : ""
            }`}
            name="returnedPhoneNumber"
            type="number"
            id="returnedPhoneNumber"
            placeholder="ex: 70221*****"
            {...register("returnedPhoneNumber", {
              required: "This field is required",
              maxLength: {
                value: 10,
                message: "Phone number should be 10 digits",
              },
            })}
          />
          {errors.returnedPhoneNumber && (
            <div className="invalid-feedback">
              {errors.returnedPhoneNumber.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap sm:gap-4">
        {/* Date */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="returnDate"
          >
            Date: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-400 ${
              errors.returnDate ? "border-red-500" : ""
            }`}
            name="returnDate"
            type="date"
            id="returnDate"
            defaultValue={currentDate}
            {...register("returnDate", { required: "This field is required" })}
            min={lastYearDateString}
            max={currentDate}
          />
          {errors.returnDate && (
            <div className="invalid-feedback">{errors.returnDate.message}</div>
          )}
        </div>
      </div>

      {/* Submit button */}
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
            "Generate OTP"
          )}
        </button>
      </div>

      {/* OTP Popup */}
      {/* <FormPopup
        isOpen={otpPopupVisible}
        onClose={handleCloseOTPPopup}
        type="otp"
        returnDetail={data}
      /> */}
    </form>
  );
}

ReturnForm.propTypes = {
  returnData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    // Other fields in returnData
  }).isRequired,
  // Other prop validations
};

export default ReturnForm;
