import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileDataFunction } from "../services/API";
import ToastMsg from "../constants/ToastMsg";
import { FaSpinner } from "react-icons/fa";

export default function Info() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    registrationNo: "",
    dayScholarOrHosteler: "",
  });

  // getting user token from localstorage
  const userToken = useSelector((state) => state.storedUserData.userToken);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await getProfileDataFunction(userToken);
      //console.log(response);
      if (response.status == 200) {
        setUserData({
          ...userData,
          name: response.data.profile.name,
          dayScholarOrHosteler: response.data.profile.dayScholarORhosteler,
          email: response.data.profile.email,
          registrationNo: response.data.profile.registrationNo,
          phoneNumber: response.data.profile.phoneNumber,
        });
        //console.log(userData);
      } else {
        ToastMsg("Some error has occured while fetching your data", "error");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserData();
    }
  }, []);

  return (
    <>
      {loading ? (
        <>
          <FaSpinner className="mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <div className="w-full md:w-1/2 bg-gray-100 py-4 md:ms-10 flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-1/4  md:mb-4 md:mb-0">
            {/* <h2 className="text-lg font-semibold">Image</h2> */}
            <div className="w-32 h-32 bg-gray-300 md:ms-4 md:mt-6" ><img alt="profilepic" src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1720887419~exp=1720891019~hmac=be15c5244f21af8a9bbd2230a8b9c9eb69a8a80d8b96fb9786cc2eebf07dc43d&w=740"/></div>
          </div>
          <div className="w-full md:w-1/2 md:py-5 sm:p-3">
            <div className="mb-4">
              <h2 className="text-base md:text-lg font-semibold">
                Name:{" "}
                <span className="text-gray-600 text-sm md:text-base">
                  {userData.name}
                </span>
              </h2>
            </div>
            <div className="mb-4">
              <h2 className="text-base md:text-lg font-semibold">
                Email:{" "}
                <span className="text-gray-600 text-sm md:text-base">
                  {userData.email}
                </span>
              </h2>
            </div>
            <div className="mb-4">
              <h2 className="text-base md:text-lg font-semibold">
                Registration Number:{" "}
                <span className="text-gray-600 text-sm md:text-base">
                  {userData.registrationNo}
                </span>
              </h2>
            </div>
            <div className="mb-4">
              <h2 className="text-base md:text-lg font-semibold">
                Day Scholar/ Hosteler:{" "}
                <span className="text-gray-600 text-sm md:text-base">
                  {userData.dayScholarOrHosteler}
                </span>
              </h2>
            </div>
            {userData.phoneNumber ? (
              <div className="mb-4">
                <h2 className="text-base md:text-lg font-semibold">
                  Phone number:{" "}
                  <span className="text-gray-600 text-sm md:text-base">
                    {userData.phoneNumber}
                  </span>
                </h2>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}
