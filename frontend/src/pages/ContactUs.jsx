import React from 'react';
import { useSelector } from "react-redux";

function ContactUs() {
  // getting user data from localstorage****************
  const userName = useSelector(
    (state) => state.storedUserData.userData.userName
  );
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );
  // *****************************************************

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
  };

  return (
    <div className="w-full py-4 sm:h-[90vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-300">
      <div className="flex flex-col md:flex-row gap-4 p-2 sm:p-10 bg-white md:h-[60vh] lg:h-[65vh] w-5/6 sm:w-[80vw] lg:w-4/6 rounded-2xl shadow-lg bg-opacity-80">
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
          <form className="w-full" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-wrap sm:gap-4">
              <div className="mb-3 w-full">
                <input
                  type="text"
                  name="name"
                  placeholder="eg: Shashank Sharma"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  required
                />
              </div>

              <div className="mb-3 w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="eg: shashank.sharma2022@vitstudent.ac.in"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  required
                />
              </div>

              <div className="mb-3 w-full">
                <textarea
                  name="message"
                  placeholder="Your message !!"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
