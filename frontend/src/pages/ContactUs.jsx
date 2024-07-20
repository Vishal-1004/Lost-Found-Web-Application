import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import ToastMsg from "../constants/ToastMsg";

function ContactUs() {
  // Getting user data from localstorage****************
  const userName = useSelector((state) => state.storedUserData.userData.userName);
  const userEmail = useSelector((state) => state.storedUserData.userData.userEmail);
  // *****************************************************

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: userName || "",
      email: userEmail || "",
      message: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log("Form Data:", formData);
    
    try {
      ToastMsg("Message sent successfully!", "success");
      reset();
    } catch (error) {
      ToastMsg("Internal Server Error! Please Try Later", "error");
      console.error("Error: ", error);
    }
  };

  return (
    <div className="w-full py-4 flex items-center justify-center bg-gradient-to-b from-[#fff] to-blue-200">
      <div className="flex flex-col md:flex-row gap-4 p-2 sm:p-10 bg-white w-5/6 sm:w-[80vw] lg:w-4/6 rounded-2xl shadow-lg bg-opacity-80">
        <div className="w-full md:w-1/2 flex flex-col items-center sm:items-start gap-6">
          <div className="flex flex-col items-start">
            <h1 className="text-[28px] sm:text-[36px] font-bold text-gray-700">
              Get in touch
            </h1>
            <hr className="sm:my-2 border-t-4 border-gray-400 w-[70px] sm:w-[100px]" />
          </div>

          <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            quis quo iusto rerum cupiditate praesentium, sapiente vero dolorum
            in doloribus dolores, vel obcaecati sequi iste est corrupti tempore
            non veritatis natus. Eum voluptatibus quasi unde magnam corporis,
            vel cupiditate, veniam molestiae illo alias dolore provident!
            Deserunt totam odio qui quo!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4 border-2 rounded-xl bg-white">
          <form
            className="w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h2 className="text-[28px] sm:text-[32px] text-center font-bold text-gray-700 mb-2">
              Contact Form
            </h2>

            <div className="flex flex-wrap gap-4">
              <div className="mb-3 w-full">
                <input
                  type="text"
                  name="name"
                  placeholder="eg: Shashank Sharma"
                  aria-label="Name"
                  className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 transition-all duration-300 ease-in-out`}
                  {...register("name", { required: "Name is required" })}
                  readOnly
                />
                {errors.name && (
                  <div className="invalid-feedback text-red-500">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3 w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="eg: shashank.sharma2022@vitstudent.ac.in"
                  aria-label="Email"
                  className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 transition-all duration-300 ease-in-out`}
                  readOnly
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3 w-full">
                <textarea
                  name="message"
                  placeholder="Your message !!"
                  aria-label="Message"
                  className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-500 transition-all duration-300 ease-in-out`}
                  rows={5}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 50,
                      message: "Message must be at least 50 characters",
                    },
                  })}
                />
                {errors.message && (
                  <div className="invalid-feedback text-red-500">{errors.message.message}</div>
                )}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btnSubmit w-full flex justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="mr-3 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
