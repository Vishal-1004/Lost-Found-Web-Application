import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import ToastMsg from "../constants/ToastMsg";
import { createFoundItemPost, editFoundItemPost } from "../services/API";

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

function EditForm({ onClose, editData }) {
  console.log(editData);
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  const [formLoading, setFormLoading] = useState(false);
  const [customLocation, setCustomLocation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      founderName: editData.founder.name || "",
      founderRegNo: editData.founder.regNo || "",
      founderEmail: editData.founder.email || "",
      founderPhoneNumber: editData.founder.number || 0,
      itemLocation: editData.location || "",
      dayScholarORhosteler: editData.founder.dayScholarORhosteler || "",
    },
  });

  // handling the image file which the user gives
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(editData.url || "");
  // **************************************

  // on submit
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    console.log("Edit the form", formData);
    console.log("Editing post id: ", editData.id);
    const formDataToSend = new FormData();

    if (file) {
      formDataToSend.append("photo", file);
    }
    formDataToSend.append("title", formData.itemTitle);
    formDataToSend.append("description", formData.itemDescription);
    formDataToSend.append("date", formData.date);
    formDataToSend.append(
      "location",
      formData.itemLocation == "Custom"
        ? formData.customLocation
        : formData.itemLocation
    );
    formDataToSend.append(
      "founderPhoneNumber",
      !isChecked ? null : formData.founderPhoneNumber
    );
    formDataToSend.append("email", userEmail || formData.founderEmail);
    formDataToSend.append("foundItemId", editData.id); // prop validation missing
    formDataToSend.append("itemImage", editData.url); // prop validation missing
    try {
      const response = await editFoundItemPost(formDataToSend);
      console.log(response);
      if (response.status === 200) {
        ToastMsg(response.data.message, "success");
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      ToastMsg("Internal Server Error! Please Try Later", "error");
      console.error("Error: ", error);
    } finally {
      setFormLoading(false);
      onClose();
      window.location.reload();
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
  const formattedDate = new Date(editData.date).toISOString().split("T")[0];
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
        {/* Item title */}
        <div className="mb-3 w-full sm:w-1/2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="itemTitle"
          >
            Item Title:{" "}
          </label>
          <input
            className={`form-control text-gray-500 ${
              errors.itemTitle ? "border-red-500" : ""
            }`}
            name="itemTitle"
            type="text"
            id="itemTitle"
            defaultValue={editData.title}
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
            Date:
          </label>
          <input
            className={`form-control text-gray-400 ${
              errors.date ? "border-red-500" : ""
            }`}
            name="date"
            type="date"
            id="date"
            defaultValue={formattedDate}
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
        </label>
        <textarea
          className={`form-control text-gray-500 ${
            errors.itemDescription ? "border-red-500" : ""
          }`}
          name="itemDescription"
          id="itemDescription"
          defaultValue={editData.about}
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

      {/* Found/Lost location */}
      <div className="mb-3 w-full sm:w-1/2">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="itemLocation"
        >
          Item Found/Lost Location:{" "}
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
          defaultValue={editData.location || ""}
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
            id="customLocation"
            type="text"
            defaultValue={editData.location}
            placeholder="ex: North Square"
            {...register("customLocation", {
              required: "Custom location is required",
            })}
          />
        )}
      </div>

      {/* Item photo */}
      <div className="mb-3">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="itemImage"
        >
          Item Image (jpg, png, jpeg):{" "}
          {/* <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" /> */}
        </label>
        <input
          className={`form-control text-gray-500 ${
            errors.itemImage ? "border-red-500" : ""
          }`}
          name="itemImage"
          type="file"
          id="itemImage"
          accept=".jpg,.png,.jpeg"
          {...register("itemImage")}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {errors.itemImage && (
          <div className="invalid-feedback">{errors.itemImage.message}</div>
        )}
      </div>

      <div className="visible">
        <hr className="my-8 mx-auto border-t-2 border-gray-300 sm:w-[550px]" />

        <p className="text-gray-500 text-[18px] font-semibold mb-2">
          Posted by:
        </p>

        <div className="flex flex-wrap sm:flex-nowrap sm:gap-4">
          {/* name */}
          <div className="mb-3 w-full sm:w-1/2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="founderName"
            >
              Name:
            </label>
            <input
              className={`form-control text-gray-500`}
              name="founderName"
              type="text"
              id="founderName"
              placeholder="ex: Shashank Sharma"
              readOnly
              {...register("founderName", {
                required: "Founder name is required",
              })}
            />
            {/* {errors.founderName && (
              <div className="invalid-feedback">{errors.founderName.message}</div>
            )} */}
          </div>

          {/* reg no */}
          <div className="mb-3 w-full sm:w-1/2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="founderRegNo"
            >
              Registration Number:{" "}
            </label>
            <input
              className={`form-control text-gray-500`}
              name="founderRegNo"
              type="text"
              id="founderRegNo"
              placeholder="ex: 22BCE1411"
              readOnly
              {...register("founderRegNo", {
                required: "Founder registration number is required",
                pattern: {
                  value: /^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                  message: "Invalid registration number",
                },
              })}
            />
            {/* {errors.founderRegNo && (
              <div className="invalid-feedback">
                {errors.founderRegNo.message}
              </div>
            )} */}
          </div>
        </div>

        {/* mail id */}
        <div className="mb-3">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="founderEmail"
          >
            Email:
          </label>
          <input
            className={`form-control text-gray-500`}
            name="founderEmail"
            type="email"
            id="founderEmail"
            placeholder="ex: shashank.sharma2022@vitstudent.ac.in"
            readOnly
            {...register("founderEmail", {
              required: "Founder email is required",
              pattern: {
                value:
                  /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$/,
                message: "Invalid email",
              },
            })}
          />
          {/* {errors.founderEmail && (
            <div className="invalid-feedback">{errors.founderEmail.message}</div>
          )} */}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap sm:gap-4 items-center">
          {/* Hosteller or Day scholar */}
          <div className="mb-3 w-full sm:w-1/2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="dayScholarORhosteler"
            >
              Hosteller/Day Scholar:{" "}
            </label>
            <select
              className={`form-control text-gray-500`}
              name="Hosteller/Day Scholar"
              id="dayScholarORhosteler"
              defaultValue={editData.founder.dayScholarORhosteler || ""}
              disabled
              {...register("dayScholarORhosteler", {
                required: "This field is required",
              })}
            >
              <option value="">Select an option</option>
              <option value="Hosteler">Hosteler</option>
              <option value="Day Scholar">Day Scholar</option>
            </select>
            {/* {errors.dayScholarORhosteler && (
              <div className="invalid-feedback">
                {errors.dayScholarORhosteler.message}
              </div>
            )} */}
          </div>

          {/* phone number */}
          <div className="mb-3 w-full sm:w-1/2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="founderPhoneNumber"
            >
              <span>Phone Number: (optional)</span>
              <input
                type="checkbox"
                className="ml-2"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </label>
            <input
              className={`form-control text-gray-500`}
              name="founderPhoneNumber"
              type="number"
              id="founderPhoneNumber"
              placeholder="ex: 70221*****"
              {...register("founderPhoneNumber", {
                maxLength: {
                  value: 10,
                  message: "Phone number should be 10 digits",
                },
              })}
              disabled={!isChecked}
            />
            {/* {errors.founderPhoneNumber && (
              <div className="invalid-feedback">
                {errors.founderPhoneNumber.message}
              </div>
            )} */}
          </div>
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
            "Edit Item"
          )}
        </button>
      </div>
    </form>
  );
}

export default EditForm;
