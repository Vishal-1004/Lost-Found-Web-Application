import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import ToastMsg from "../constants/ToastMsg";
import { createFoundItemPost } from "../services/API";
import moment from "moment";

// default locations available
const locations = [
  "Custom",
  "Clock Court",
  "Gazebo",
  "AB-1",
  "AB-2",
  "AB-3",
  "Delta Block",
];

function FoundItemForm({ onClose }) {
  // getting user data from localstorage****************
  const userName = useSelector(
    (state) => state.storedUserData.userData.userName
  );
  const userRegistrationNo = useSelector(
    (state) => state.storedUserData.userData.userRegistrationNo
  );
  const userPhoneNumber = useSelector(
    (state) => state.storedUserData.userData.userPhoneNumber
  );
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );
  const userDayScholarORhosteler = useSelector(
    (state) => state.storedUserData.userData.userDayScholarORhosteler
  );
  const userStatus = useSelector((state) => state.storedUserData.userStatus);
  // *****************************************************

  const [formLoading, setFormLoading] = useState(false);
  const [customLocation, setCustomLocation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  // handling the image file which the user gives
  const [file, setFile] = useState(null);

  // on submit
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("photo", file);
    formDataToSend.append("itemTitle", formData.itemTitle);
    formDataToSend.append("itemDescription", formData.itemDescription);
    formDataToSend.append("itemFoundDate", formData.date);
    formDataToSend.append(
      "itemLocation",
      moment(formData.itemLocation).format("DD-MM-YYYY")
    );
    formDataToSend.append("founderName", userName);
    formDataToSend.append("founderRegistrationNumber", userRegistrationNo);
    formDataToSend.append("founderEmail", userEmail);
    formDataToSend.append(
      "founderDayScholarORhosteler",
      formData.dayScholarORhosteler
    );
    formDataToSend.append("founderStatus", userStatus ? userStatus : "USER");
    formDataToSend.append("founderPhoneNumber", userPhoneNumber);

    try {
      const response = await createFoundItemPost(formDataToSend);
      //console.log(response);
      if (response.status === 200) {
        ToastMsg(response.data.message, "success");
      } else {
        ToastMsg(response.data.message, "error");
      }
    } catch (error) {
      ToastMsg("Internal Server Error! Please Try Later", "error");
      //console.error("Error: ", error);
    } finally {
      setFormLoading(false);
      reset();
    }
  };

  // handle custom input field for location
  const handleLocationChange = (e) => {
    if (e.target.value === "Custom") {
      setCustomLocation(true);
    } else {
      setCustomLocation(false);
    }
  };

  // capitalize reg no
  const RegNo = watch("founderRegNo");
  useEffect(() => {
    setValue("founderRegNo", RegNo?.toUpperCase());
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
      <div className="flex flex-wrap sm:flex-nowrap gap-4">
        {/* Item title */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="itemTitle"
          >
            Item Title:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-500 ${
              errors.itemTitle ? "border-red-500" : ""
            }`}
            name="itemTitle"
            type="text"
            id="itemTitle"
            placeholder="ex: Sunglasses"
            {...register("itemTitle", { required: "Item title is required" })}
          />
          {errors.itemTitle && (
            <div className="invalid-feedback">{errors.itemTitle.message}</div>
          )}
        </div>

        {/* Date */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="date"
          >
            Date: <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-400 ${
              errors.date ? "border-red-500" : ""
            }`}
            name="date"
            type="date"
            id="date"
            defaultValue={currentDate}
            {...register("date", { required: "Date is required" })}
            min={lastYearDateString}
            max={currentDate}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date.message}</div>
          )}
        </div>
      </div>

      {/* Item description */}
      <div className="mb-3">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="itemDescription"
        >
          Item Description:{" "}
          <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <textarea
          className={`form-control text-gray-500 ${
            errors.itemDescription ? "border-red-500" : ""
          }`}
          name="itemDescription"
          id="itemDescription"
          placeholder="Describe the item found"
          rows={5}
          {...register("itemDescription", {
            required: "Item description is required",
            minLength: {
              value: 150,
              message: "Item description must be at least 150 characters",
            },
            maxLength: {
              value: 300,
              message: "Item description must not exceed 300 characters",
            },
          })}
        />
        {errors.itemDescription && (
          <div className="invalid-feedback">
            {errors.itemDescription.message}
          </div>
        )}
      </div>

      {/* Found location */}
      <div className="mb-3 w-full sm:w-1/2">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="itemLocation"
        >
          Item Found Location:{" "}
          <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <select
          className={`form-control text-gray-500 ${
            errors.itemLocation ? "border-red-500" : ""
          }`}
          name="itemLocation"
          id="itemLocation"
          {...register("itemLocation", {
            required: "Item location is required",
          })}
          onChange={handleLocationChange}
        >
          <option value="">Select a location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        {errors.itemLocation && (
          <div className="invalid-feedback">{errors.itemLocation.message}</div>
        )}
        {customLocation && (
          <input
            className={`form-control text-gray-500 mt-2 ${
              errors.customLocation ? "border-red-500" : ""
            }`}
            name="customLocation"
            type="text"
            placeholder="ex: North Square"
            {...register("customLocation", {
              required: "Custom location is required",
            })}
          />
        )}
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-4">
        {/* Founder name */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="founderName"
          >
            Founder Name:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-500 ${
              errors.founderName ? "border-red-500" : ""
            }`}
            name="founderName"
            type="text"
            id="founderName"
            value={userName ? userName : null}
            placeholder="ex: Shashank Sharma"
            {...register("founderName", {
              required: "Founder name is required",
            })}
          />
          {errors.founderName && (
            <div className="invalid-feedback">{errors.founderName.message}</div>
          )}
        </div>

        {/* Founder reg no */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="founderRegNo"
          >
            Founder Registration No:{" "}
            <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
          </label>
          <input
            className={`form-control text-gray-500 ${
              errors.founderRegNo ? "border-red-500" : ""
            }`}
            name="founderRegNo"
            type="text"
            id="founderRegNo"
            placeholder="ex: 22BCE1411"
            value={userRegistrationNo ? userRegistrationNo : null}
            {...register("founderRegNo", {
              required: "Founder registration number is required",
              pattern: {
                value: /^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                message: "Invalid registration number",
              },
            })}
          />
          {errors.founderRegNo && (
            <div className="invalid-feedback">
              {errors.founderRegNo.message}
            </div>
          )}
        </div>
      </div>

      {/* Founder mail id */}
      <div className="mb-3">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="founderEmail"
        >
          Founder Email:{" "}
          <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <input
          className={`form-control text-gray-500 ${
            errors.founderEmail ? "border-red-500" : ""
          }`}
          name="founderEmail"
          type="email"
          id="founderEmail"
          value={userEmail ? userEmail : null}
          placeholder="ex: shashank.sharma2022@vitstudent.ac.in"
          {...register("founderEmail", {
            required: "Founder email is required",
            pattern: {
              value:
                /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.founderEmail && (
          <div className="invalid-feedback">{errors.founderEmail.message}</div>
        )}
      </div>

      {/* Hosteller or Day scholar */}
      <div className="mb-3 w-full md:w-1/2">
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
          value={userDayScholarORhosteler}
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

      {/* Founder phone number */}
      <div className="mb-3 w-full sm:w-1/2">
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="founderPhone"
        >
          Founder Phone Number: (optional)
        </label>
        <input
          className="form-control text-gray-500"
          name="founderPhone"
          type="text"
          id="founderPhone"
          value={userPhoneNumber ? userPhoneNumber : null}
          placeholder="ex: 70221*****"
          {...register("founderPhone")}
        />
      </div>

      {/* Item photo */}
      <div className="mb-3">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="itemImage"
        >
          Item Image (jpg, png, jpeg):{" "}
          <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
        </label>
        <input
          className={`form-control text-gray-500 ${
            errors.itemImage ? "border-red-500" : ""
          }`}
          name="itemImage"
          type="file"
          id="itemImage"
          accept=".jpg,.png,.jpeg"
          {...register("itemImage", { required: "Item image is required" })}
          onChange={(e) => {
            setFile(e.target.files[0]);
            //console.log(e.target.files[0]);
          }}
        />
        {errors.itemImage && (
          <div className="invalid-feedback">{errors.itemImage.message}</div>
        )}
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
            "Add Item"
          )}
        </button>
      </div>
    </form>
  );
}

export default FoundItemForm;
