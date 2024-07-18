import { useEffect, useState } from "react";
import Doughnut from "./DoughnutChart";
import ToastMsg from "../constants/ToastMsg";
import { getHomePageGraphDataFunction } from "../services/API";
import { FaSpinner } from "react-icons/fa";

const HomeStatus = () => {
  const [profileTab, setProfileTab] = useState("AllUsers");
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState({
    allUsersData: {
      noOfRegisteredUsers: 0,
      noOfNonRegisteredUsers: 0,
    },
    postsData: {
      noOfLostPosts: 0,
      noOfFoundPosts: 0,
    },
  });

  const getGraphData = async () => {
    setLoading(true);
    try {
      const response = await getHomePageGraphDataFunction();
      console.log(response);
      if (response.status == 200) {
        //ToastMsg("Home page graph data fetched", "success");
        setGraphData(response.data);
      } else {
        ToastMsg("Error while fetchign the graph data", "error");
      }
    } catch (error) {
      ToastMsg("Server error! please try later", "error");
      console.log("Internal Server Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGraphData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4 md:p-8">
      <div className="w-full bg-blue-50 p-4 rounded-lg border">
        <div className="w-full">
          <nav className="flex justify-center py-2 ">
            <button
              className={`p-1 w-full text-center border-b font-medium text-sm 
                ${
                  profileTab === "AllUsers" ? ` border-blue-500` : "border-transparent"
                } `}
              onClick={() => setProfileTab("AllUsers")}
            >
              Users
            </button>
            <button
              className={`p-1 w-full text-center border-b font-medium text-sm 
                ${
                  profileTab === "AllPosts"
                    ? ` border-blue-500`
                    : "border-transparent"
                } `}
              onClick={() => setProfileTab("AllPosts")}
            >
              Posts
            </button>
          </nav>
          {loading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <div className="mt-4">
              {profileTab === "AllPosts" && (
                <div className="py-1">
                  <Doughnut
                    labels={["Found Posts", "Lost Posts"]}
                    dataSet={[
                      graphData.postsData.noOfFoundPosts,
                      graphData.postsData.noOfLostPosts,
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
              {profileTab === "AllUsers" && (
                <div className="py-1">
                  <Doughnut
                    labels={["Registered Users", "Non Registered Users"]}
                    dataSet={[
                      graphData.allUsersData.noOfRegisteredUsers,
                      graphData.allUsersData.noOfNonRegisteredUsers,
                    ]}
                    backgroundColor={[
                      "rgba(66, 165, 245, 0.2)",
                      "rgba(255, 183, 77, 0.2)",
                      // "rgba(205,0,0,0.3)",
                    ]}
                    borderColor={[
                      "rgba(66, 165, 245, 1)",
                      "rgba(255, 183, 77, 1)",
                      // "rgba(205,0,0,0.5)",
                    ]}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeStatus;
