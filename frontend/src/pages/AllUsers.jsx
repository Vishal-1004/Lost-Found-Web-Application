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

  // Getting user email from local storage
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

  // handle action button click
  const handleActionClick = (username) => {
    console.log(`User: ${username}`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-center md:text-left text-3xl md:text-4xl font-semibold mb-4">All Users</h1>
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
          <div className="overflow-x-auto xl:overflow-x-visible">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-2 border-b">ID</th>
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
                    <td className="py-2 px-2 border-b max-w-[100px] truncate">{user._id}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b max-w-[300px] break-words whitespace-normal">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.registrationNo}</td>
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
                    <td className="py-2 px-4 border-b">example</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="btnSubmit bg-blue-500 text-white p-2 rounded"
                        onClick={() => handleActionClick(user.name)}
                      >
                        Action
                      </button>
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
