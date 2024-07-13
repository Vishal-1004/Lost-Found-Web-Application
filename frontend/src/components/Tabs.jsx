// src/components/Tabs.js
import { useState, useEffect } from "react";
import ToastMsg from "../constants/ToastMsg";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { getFoundItemsPostByUserFunction } from "../services/API";
import moment from "moment";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Lost");
  const [loading, setLoading] = useState(false);
  const [foundPostsData, setFoundPostsData] = useState([]);

  // Getting user registration number from localstorage
  const userRegistrationNo = useSelector(
    (state) => state.storedUserData.userData.userRegistrationNo
  );
  // Getting user phone number from localstorage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );
  // getting user token from localstorage
  const userToken = useSelector((state) => state.storedUserData.userToken);

  const getFoundPostsData = async () => {
    setLoading(true);
    try {
      const response = await getFoundItemsPostByUserFunction(
        userEmail,
        userRegistrationNo
      );
      //console.log(response);
      if (response.status == 200) {
        //ToastMsg("Found posts data fetched successfully", "success");
        setFoundPostsData(response.data.data);
      }
    } catch (error) {
      ToastMsg("Internal Server Error! Please Try Later", "error");
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      getFoundPostsData();
    }
  }, []);

  return (
    <div className="w-full mt-10">
      <div className="w-full border-gray-200">
        <nav className="flex justify-center">
          <button
            className={`w-full max-w-xs py-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "Lost"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("Lost")}
          >
            Lost
          </button>
          <button
            className={`w-full max-w-xs py-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "Found"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("Found")}
          >
            Found
          </button>
        </nav>
      </div>
      <div className="mt-4">
        {activeTab === "Lost" && (
          <div>
            {/* Lost content goes here */}
            <p>Lost Items</p>
          </div>
        )}
        {activeTab === "Found" && (
          <div className="flex flex-wrap overflow-hidden py-4 justify-start md:mx-10">
            {/* Found content goes here */}
            {/* <p>Found Items</p> */}
            {foundPostsData?.map((element, index) => (
              <div className="px-1 py-1 mx-2" key="index">
              <ItemCard
                key={index}
                url={element.itemImage}
                title={element.title}
                date={moment(element.date).format("DD-MM-YYYY")}
                about={element.description}
                location={element.location}
              />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
