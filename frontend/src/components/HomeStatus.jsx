import { useEffect, useState } from "react";
import ToastMsg from "../constants/ToastMsg";
import { getHomePageGraphDataFunction } from "../services/API";
import { FaSpinner } from "react-icons/fa";

const HomeStatus = () => {
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
    <div>
      <h1>Stats</h1>
      {loading ? (
        <>
          <FaSpinner className="mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <div className="">
          <p>
            No of registered users: {graphData.allUsersData.noOfRegisteredUsers}
          </p>
          <p>
            No of non registered users:{" "}
            {graphData.allUsersData.noOfNonRegisteredUsers}
          </p>
          <p>No of found posts: {graphData.postsData.noOfFoundPosts}</p>
          <p>No of lost posts: {graphData.postsData.noOfLostPosts}</p>
        </div>
      )}
    </div>
  );
};

export default HomeStatus;
