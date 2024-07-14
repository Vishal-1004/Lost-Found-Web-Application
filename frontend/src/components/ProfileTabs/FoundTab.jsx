import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFoundItemsPostByUserFunction } from "../../services/API";
import ToastMsg from "../../constants/ToastMsg";
import { Link } from "react-router-dom";
import DetailedViewPopup from "../DetailedViewPopup";
import FormPopup from "../FormPopup";
import ItemCard from "../ItemCard";
import moment from "moment";
import { ErrorComponent, NoDataComponent } from "../../utility";

const FoundTab = () => {
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

  const [sortingOrder, setSortingOrder] = useState(-1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [error, setError] = useState(false);
  const [noData, setNoData] = useState(false);

  const getFoundPostsData = async () => {
    setLoading(true);
    try {
      const response = await getFoundItemsPostByUserFunction(
        userEmail,
        userRegistrationNo,
        sortingOrder,
        debouncedSearch
      );
      //console.log(response);
      if (response.status == 200) {
        //ToastMsg("Found posts data fetched successfully", "success");
        setFoundPostsData(response.data.data);
        setNoData(false);
      } else if (response.response.data.metaData == 0) {
        setNoData(true);
      }
    } catch (error) {
      ToastMsg("Internal Server Error! Please Try Later", "error");
      console.error("Error: ", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      getFoundPostsData();
    }
  }, [debouncedSearch, sortingOrder]);

  // Debounce mechanism
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // 1s debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // *************************

  // item popup form
  const [showFoundPopup, setShowFoundPopup] = useState(false);

  const handleOpenFormPopup = () => {
    console.log("Creat post popup clicked");
    setShowFoundPopup(true);
  };

  const handleCloseFormPopup = () => {
    setShowFoundPopup(false);
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
            onChange={(e) => setSortingOrder(parseInt(e.target.value, 10))}
          >
            <option value="-1">Z-A</option>
            <option value="1">A-Z</option>
          </select>
        </div>
        <div className="flex items-center justify-center md:px-2">
          <Link className="btnSubmit" onClick={handleOpenFormPopup}>
            Create a post
          </Link>
        </div>
      </div>
      {error ? (
        <ErrorComponent />
      ) : noData ? (
        <NoDataComponent />
      ) : (
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
          <FormPopup
            isOpen={showFoundPopup}
            onClose={handleCloseFormPopup}
            type="found"
          />

          {/* detailed view popup */}
          {selectedItem && (
            <DetailedViewPopup item={selectedItem} onClose={handleClosePopup} />
          )}
        </div>
      )}
    </div>
  );
};

export default FoundTab;
