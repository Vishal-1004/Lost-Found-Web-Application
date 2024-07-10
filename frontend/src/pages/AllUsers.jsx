import { useEffect, useState } from "react";
import ToastMsg from "../constants/ToastMsg";
import { getAllUsersFunction } from "../services/API";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";

const AllUsers = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: null,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Getting user email from localstorage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  useEffect(() => {
    const gettingAllUsersFunction = async () => {
      setFormLoading(true);
      try {
        const response = await getAllUsersFunction(
          userEmail,
          pageInfo.currentPage,
          debouncedSearch
        );
        if (response.status === 200) {
          setAllUsers(response.data.getUsers);
          setPageInfo({
            currentPage: parseInt(response.data.currentPage, 10),
            totalPages: parseInt(response.data.totalPages, 10),
          });
          ToastMsg("All users data achieved", "success");
        } else {
          ToastMsg(response.response.data.message, "error");
        }
      } catch (error) {
        ToastMsg("Server error! please try later", "error");
        console.error("Internal Server Error:", error);
      } finally {
        setFormLoading(false);
      }
    };

    // To avoid multiple calls, you can add a check if userEmail is available
    if (userEmail) {
      gettingAllUsersFunction();
    }
  }, [pageInfo.currentPage, debouncedSearch, userEmail]);

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

  return (
    <>
      {formLoading ? (
        <>
          <FaSpinner className="mr-3 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <div>
            Current page is: {pageInfo.currentPage} <br />
            Total Pages is: {pageInfo.totalPages} <br />
            <div className="flex">
              {pageInfo.currentPage === 1 ? null : (
                <button className="bg-red-400 p-2" onClick={handlePrevBtnClick}>
                  Prev
                </button>
              )}
              {pageInfo.currentPage === pageInfo.totalPages ? null : (
                <button
                  className="bg-green-400 p-2"
                  onClick={handleNextBtnClick}
                >
                  Next
                </button>
              )}
            </div>
            <br />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
            />
          </div>
          <hr />
          {allUsers.map((user, index) => (
            <div key={user._id}>
              <p>User {index + 1}:</p>
              <p>ID: {user._id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Registration No: {user.registrationNo}</p>
              <p>Phone Number: {user.phoneNumber || "N/A"}</p>
              {user.dayScholarORhosteler && (
                <p>Day Scholar or Hosteler: {user.dayScholarORhosteler}</p>
              )}
              <p>Total Found Posts: {user.foundItemsID.length}</p>
              <p>Total Lost Posts: {user.lostItemsID.length}</p>
              {/* Add other fields here as needed */}
              <hr />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default AllUsers;
