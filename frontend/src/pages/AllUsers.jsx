import { useEffect, useState } from "react";
import ToastMsg from "../constants/ToastMsg";
import {
  changeStatusOfRegisteredUsersFunction,
  getAllUsersFunction,
} from "../services/API";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";

const AllUsers = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: null,
    limit: 5,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Getting user email from local storage
  const userEmail = useSelector(
    (state) => state.storedUserData.userData.userEmail
  );

  // Getting user token from localstorage
  const userToken = useSelector((state) => state.storedUserData.userToken);

  const gettingAllUsersFunction = async () => {
    setFormLoading(true);
    try {
      const response = await getAllUsersFunction(
        userEmail,
        pageInfo.currentPage,
        debouncedSearch,
        pageInfo.limit
      );
      if (response.status === 200) {
        setAllUsers(response.data.getUsers);
        setPageInfo({
          currentPage: parseInt(response.data.currentPage, 10),
          totalPages: parseInt(response.data.totalPages, 10),
          limit: parseInt(response.data.limit, 10),
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

  useEffect(() => {
    // To avoid multiple calls, you can add a check if userEmail is available
    if (userEmail) {
      gettingAllUsersFunction();
    }
  }, [pageInfo.currentPage, debouncedSearch, userEmail, pageInfo.limit]);

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

  const handleLimitBtnClick = (limit) => {
    setPageInfo((prevState) => ({
      ...prevState,
      limit: parseInt(limit),
    }));
  };

  // handle action button click
  const handleActionSelect = async (newStatus, userId) => {
    setActionLoading(true);
    if (newStatus != "0") {
      try {
        const response = await changeStatusOfRegisteredUsersFunction(
          userId,
          userToken,
          newStatus
        );
        //console.log(response);
        if (response.status == 200) {
          ToastMsg(response.data.message, "success");
        } else {
          ToastMsg(response.response.data.message, "error");
        }
        gettingAllUsersFunction();
      } catch (error) {
        console.log("Some error occured:", error);
      } finally {
        setActionLoading(false);
      }
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-center md:text-left text-3xl md:text-4xl font-semibold mb-4">
        All Users
      </h1>
      {formLoading ? (
        <div className="flex items-center">
          <FaSpinner className="mr-3 animate-spin" />
          Loading...
        </div>
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
          {/* No of users to show */}
          <div className="mb-3 w-full md:w-1/2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="limit"
            >
              No. of users:
            </label>
            <select
              className="form-control"
              name="Hosteller/Day Scholar"
              id="limit"
              value={pageInfo.limit}
              onChange={(e) => handleLimitBtnClick(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </div>
          <div className="overflow-x-auto xl:overflow-x-visible">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Registration No</th>
                  <th className="py-2 px-4 border-b">Phone Number</th>
                  <th className="py-2 px-4 border-b">Day Scholar/Hosteler</th>
                  <th className="py-2 px-4 border-b">Total Found Posts</th>
                  <th className="py-2 px-4 border-b">Total Lost Posts</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b max-w-[300px] break-words whitespace-normal">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.registrationNo}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.phoneNumber || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.dayScholarORhosteler}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.foundItemsID.length}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.lostItemsID.length}
                    </td>
                    <td className="py-2 px-4 border-b">{user.status}</td>
                    <td className="py-2 px-4 border-b">
                      {actionLoading ? (
                        <>
                          <FaSpinner className="mr-3 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <select
                          className="p-2 rounded bg-blue-500 text-white"
                          onChange={(e) =>
                            handleActionSelect(e.target.value, user._id)
                          }
                        >
                          <option value="0">Select Action</option>
                          <option value="BLOCKED">Block</option>
                          <option value="USER">UnBlock</option>
                          <option value="ADMIN">Promote Admin</option>
                          <option value="USER">Demote Admin</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            {pageInfo.currentPage > 1 && (
              <button
                className="btnSubmit bg-red-400 hover:bg-red-600 p-2 rounded"
                onClick={handlePrevBtnClick}
              >
                Prev
              </button>
            )}
            <div className="flex-grow"></div>
            {pageInfo.currentPage < pageInfo.totalPages && (
              <button
                className="btnSubmit bg-green-400 hover:bg-green-600 p-2 rounded"
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
        </>
      )}
    </div>
  );
};

export default AllUsers;
