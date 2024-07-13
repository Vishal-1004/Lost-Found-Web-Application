import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileDataFunction } from "../services/API";
import ToastMsg from "../constants/ToastMsg";
import { FaSpinner, FaUserCircle } from "react-icons/fa";

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
        <div className="w-full md:w-1/2 bg-blue-100 py-6 px-4 md:px-10 rounded-tl-lg rounded-bl-lg flex flex-wrap lg:flex-nowrap md:flex-col lg:flex-row md:items-center lg:items-start">
          <div className="w-full lg:w-1/4 md:mb-0 flex justify-center md:justify-start mb-4">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden border-gray-400">
              {/* <img
                alt="profilepic"
                src="https://i1.wp.com/cdn130.picsart.com/344993131001211.png"
                className="w-full h-full object-cover"
              /> */}
              <FaUserCircle size={"100px"} className="mx-auto text-blue-300" />
            </div>
          </div>
          <div className="w-full lg:w-3/4 md:py-0 px-4 md:px-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-blue-600">Name:</h2>
              <p className="text-gray-700 text-[14px]">{userData.name}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-base font-bold text-blue-600">Email:</h2>
              <p className="text-gray-700 text-[14px] break-words">{userData.email}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-base font-bold text-blue-600">Registration Number:</h2>
              <p className="text-gray-700 text-[14px]">{userData.registrationNo}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-base font-bold text-blue-600">Day Scholar/ Hosteler:</h2>
              <p className="text-gray-700 text-[14px]">{userData.dayScholarOrHosteler}</p>
            </div>
            {userData.phoneNumber && (
              <div className="mb-4">
                <h2 className="text-base font-bold text-blue-600">Phone Number:</h2>
                <p className="text-gray-700 text-[14px]">{userData.phoneNumber}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
