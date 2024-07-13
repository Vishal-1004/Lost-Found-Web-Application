import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ToastMsg from "../constants/ToastMsg";
import ItemCard from "./ItemCard";
import FormPopup from "./FormPopup";
import DetailedViewPopup from "./DetailedViewPopup";
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
      console.log(response);
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

  // search bar handling
  const [search, setSearch] = useState("");
  // *************************

  // item popup form
  const [showFoundPopup, setShowFoundPopup] = useState(false);
  const [showLostPopup, setShowLostPopup] = useState(false);

  const handleOpenFormPopup = () => {
    setShowFoundPopup(true);
    setShowLostPopup(true);
  };

  const handleCloseFormPopup = () => {
    setShowFoundPopup(false);
    setShowLostPopup(false);
  };
  // *************************

  // detailed view
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };
  // *************************

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
      <div className="mt-4 px-8">
        <div className="md:ml-16 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="p-2 border border-gray-300 rounded w-full sm:w-1/2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between px-0 md:px-4">
          <div className="md:ml-10 mb-4 w-full sm:w-1/2 md:p-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="sortBy"
            >
              Sort by:{" "}
            </label>
            <select
              className={`form-control text-gray-600`}
              name="sortBy"
              id="sortBy"
            >
              <option value="-1">Z-A</option>
              <option value="1">A-Z</option>
            </select>
          </div>
          <div className="flex items-center justify-center md:px-2">
            <Link 
              className="btnSubmit"
              onClick={handleOpenFormPopup}
            >
              Create a post
            </Link>
          </div>
        </div>
        
        {/* Lost tab section */}
        {activeTab === "Lost" && (
          <div>
            {/* lost content goes here */}
            <p>Lost Items</p>

            {/* lost item form popup */}
            <FormPopup isOpen={showLostPopup} onClose={handleCloseFormPopup} type="lost" />
          </div>
        )}

        {/* Fund tab section */}
        {activeTab === "Found" && (
          <div className="flex flex-wrap overflow-hidden py-4 justify-start md:mx-10">
            {/* found content goes here */}
            {foundPostsData?.map((element, index) => (
              <div 
                className="md:px-1 py-1 md:mx-2" 
                key={index} 
                onClick={() => handleCardClick(element)}
              >
                <ItemCard
                  url={element.itemImage}
                  title={element.title}
                  date={moment(element.date).format("ddd, D MMM YYYY")}
                  about={element.description}
                  location={element.location}
                />
              </div>
            ))}

            {/* found item form popup */}
            <FormPopup isOpen={showFoundPopup} onClose={handleCloseFormPopup} type="found" />

            {/* detailed view popup */}
            {selectedItem && (
              <DetailedViewPopup item={selectedItem} onClose={handleClosePopup} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
