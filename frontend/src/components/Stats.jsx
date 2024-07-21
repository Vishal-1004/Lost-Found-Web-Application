import Doughnut from "./DoughnutChart";
import { useEffect, useState } from "react";
import { getProfileGraphFunction } from "../services/API";
import ToastMsg from "../constants/ToastMsg";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { ErrorComponent, LoadingComponent, WarningComponent } from "../utility";
import { doneFetchingData } from "../actions";

function Stats() {
  const dispatch = useDispatch();

  const [profileTab, setProfileTab] = useState("All");
  const [graphData, setGraphData] = useState({
    allPostsData: { noOfFoundPosts: 0, noOfLostPosts: 0 },
    foundPostsData: {
      currentUserFoundPosts: 0,
      adminFoundPosts: 0,
      otherUsersFoundPost: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const userToken = useSelector((state) => state.storedUserData.userToken);

  const getGraphData = async () => {
    setLoading(true);
    try {
      const response = await getProfileGraphFunction(userToken);
      if (response.status === 200) {
        setGraphData(response.data);
        setError(false);
      } else {
        ToastMsg("Could not fetch graph data", "error");
        setError(true);
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      getGraphData();
    }
  }, [userToken]);

  // Fetching data again when ever a new post is created **********************
  const fetchData = useSelector((state) => state.dataFetching.fetchData);
  useEffect(() => {
    const reFetchData = async () => {
      await getGraphData();
      dispatch(doneFetchingData());
    };

    if (fetchData == true) {
      reFetchData();
    }
  }, [fetchData]);

  return (
    <div className="w-full md:w-5/12 bg-blue-100 p-4 rounded-tr-lg rounded-br-lg">
      <h2 className="text-lg font-semibold"></h2>
      <div className="w-full">
        <nav className="flex justify-center py-2 ">
          <button
            className={`p-1 w-full text-center border-b font-medium text-sm 
              ${
                profileTab === "All" ? ` border-blue-500` : "border-transparent"
              } `}
            onClick={() => setProfileTab("All")}
          >
            All
          </button>
          <button
            className={` p-1 w-full text-center border-b font-medium text-sm 
              ${
                profileTab === "Lost"
                  ? ` border-blue-500`
                  : "border-transparent"
              } `}
            onClick={() => setProfileTab("Lost")}
          >
            Lost
          </button>
          <button
            className={`p-1 w-full text-center border-b font-medium text-sm 
              ${
                profileTab === "Found"
                  ? ` border-blue-500`
                  : "border-transparent"
              } `}
            onClick={() => setProfileTab("Found")}
          >
            Found
          </button>
        </nav>
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <ErrorComponent />
        ) : (
          <div className="mt-4">
            {profileTab === "All" && (
              <div className="py-1">
                <Doughnut
                  labels={["Found Posts", "Lost Posts"]}
                  dataSet={[
                    graphData.allPostsData.noOfFoundPosts,
                    graphData.allPostsData.noOfLostPosts,
                  ]}
                  backgroundColor={[
                    "rgba(66, 165, 245, 0.2)",
                    "rgba(255, 183, 77, 0.2)",
                  ]}
                  borderColor={[
                    "rgba(66, 165, 245, 1)",
                    "rgba(255, 183, 77, 1)",
                  ]}
                />
              </div>
            )}
            {profileTab === "Lost" && (
              <div className="py-1">
                <WarningComponent />
              </div>
            )}
            {profileTab === "Found" && (
              <div className="py-1">
                <Doughnut
                  labels={["Yours Posts", "Admin Posts", "Others Posts"]}
                  dataSet={[
                    graphData.foundPostsData.currentUserFoundPosts,
                    graphData.foundPostsData.adminFoundPosts,
                    graphData.foundPostsData.otherUsersFoundPost,
                  ]}
                  backgroundColor={[
                    "rgba(66, 165, 245, 0.2)",
                    "rgba(255, 183, 77, 0.2)",
                    "rgba(205,0,0,0.3)",
                  ]}
                  borderColor={[
                    "rgba(66, 165, 245, 1)",
                    "rgba(255, 183, 77, 1)",
                    "rgba(205,0,0,0.5)",
                  ]}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;
