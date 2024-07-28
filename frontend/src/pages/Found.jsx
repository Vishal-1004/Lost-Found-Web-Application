import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToastMsg from "../constants/ToastMsg";
import { getFoundItemsFunction } from "../services/API";
import { ItemCard, FormPopup, DetailedViewPopup } from "../components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ErrorComponent, LoadingComponent, NoDataComponent } from "../utility";
import { doneFetchingData } from "../actions";

const Found = () => {
  const dispatch = useDispatch();

  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allFoundPosts, setAllFoundPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: null,
    limit: 6,
  });
  const [sortOrder, setSortOrder] = useState(-1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const gettingAllFoundPostFunction = async () => {
    try {
      setFormLoading(true);
      const response = await getFoundItemsFunction(
        "1",
        0,
        pageInfo.currentPage,
        debouncedSearch,
        6, // limit of posts we want to show in one page
        sortOrder
      );
      //console.log(response);
      if (response.status === 200) {
        setAllFoundPosts(response.data.data);
        setPageInfo({
          currentPage: parseInt(response.data.currentPage, 10),
          totalPages: parseInt(response.data.totalPages, 10),
          limit: parseInt(response.data.limit, 10),
        });
        setSortOrder(response.data.sortOrder);
        setError(false);
        //ToastMsg("All Found posts data achieved", "success");
      } else {
        ToastMsg(response.response.data.message, "error");
        setError(true);
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      //console.error("Internal Server Error:", error);
      setError(true);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    gettingAllFoundPostFunction();
    //console.log(pageInfo);
  }, [pageInfo.currentPage, debouncedSearch, pageInfo.limit, sortOrder]);

  // Fetching data again when ever a new post is created **********************
  const fetchData = useSelector((state) => state.dataFetching.fetchData);
  useEffect(() => {
    const reFetchData = async () => {
      await gettingAllFoundPostFunction();
      dispatch(doneFetchingData());
    };

    if (fetchData == true) {
      reFetchData();
    }
  }, [fetchData]);

  // Debounce mechanism
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // 1s debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleNextBtnClick = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
  };

  const handlePrevBtnClick = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage - 1,
    }));
  };

  // handle sort btn click
  const handleSortOrderBtnClick = (value) => {
    if (value == "-1") {
      setSortOrder(-1);
    } else {
      setSortOrder(1);
    }
  };

  // item popup form
  const [showFoundPopup, setShowFoundPopup] = useState(false);

  const handleOpenFormPopup = () => {
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
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-center text-3xl md:text-4xl font-semibold mb-4 md:mb-8">
        <span className="text-gray-600 text-4xl md:text-5xl font-bold mx-2">
          Found Items
        </span>
      </h1>
      {formLoading ? (
        <LoadingComponent loading={formLoading} />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="p-2 border rounded w-full sm:w-1/2"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-3">
            {/* Sorting dropdown */}
            <div className="mb-3 sm:mb-0 w-full sm:w-1/2">
              <label
                className="text-sm font-medium text-gray-700 flex items-center"
                htmlFor="limit"
              >
                Sort Order:
              </label>
              <select
                className="form-control"
                name="Hosteller/Day Scholar"
                id="sortOrder"
                value={sortOrder == -1 ? "-1" : "1"}
                onChange={(e) => handleSortOrderBtnClick(e.target.value)}
              >
                <option value="-1">Latest</option>
                <option value="1">Oldest</option>
              </select>
            </div>
            <div className="flex items-center justify-center md:px-2">
              <Link className="btnSubmit" onClick={handleOpenFormPopup}>
                Create a post
              </Link>
            </div>
            {/* found item form popup */}
            <FormPopup
              isOpen={showFoundPopup}
              onClose={handleCloseFormPopup}
              type="found"
            />
          </div>

          {allFoundPosts.length == 0 ? (
            <NoDataComponent />
          ) : (
            <>
              <div className="flex flex-wrap overflow-hidden py-4 justify-evenly md:mx-10">
                {allFoundPosts?.map((item, index) => (
                  <div
                    className="mb-4 md:px-1 py-1 md:mx-2"
                    key={index}
                    onClick={() => handleCardClick(item)}
                  >
                    <ItemCard
                      url={item.itemImage}
                      title={item.title}
                      date={moment(item.date).format("ddd, D MMM YYYY")}
                      about={item.description}
                      location={item.location}
                    />
                    <hr />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                {pageInfo.currentPage > 1 && (
                  <button
                    className="btnSubmit bg-red-400 hover:bg-red-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={handlePrevBtnClick}
                  >
                    Prev
                  </button>
                )}
                <div className="flex-grow"></div>
                {pageInfo.currentPage < pageInfo.totalPages && (
                  <button
                    className="btnSubmit bg-green-400 hover:bg-green-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handleNextBtnClick}
                  >
                    Next
                  </button>
                )}
              </div>

              <div className="mt-4 text-center">
                <span className="p-2 bg-gray-200 rounded">
                  Page {pageInfo.currentPage} of {pageInfo.totalPages}
                </span>
              </div>
              
              {/* detailed view popup */}
              {selectedItem && (
                <DetailedViewPopup
                  item={selectedItem}
                  onClose={handleClosePopup}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Found;
