import { useState } from "react";
import { RegisteredUsers, NonRegisteredUsers } from "../components";

function AllUsers() {
  const [activeTab, setActiveTab] = useState("registeredUsers");
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full mt-10">
      <div className="w-full border-gray-200">
        <nav className="flex justify-center">
          <button
            className={`w-full max-w-xs py-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "registeredUsers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("registeredUsers")}
          >
            Registered Users
          </button>
          <button
            className={`w-full max-w-xs py-4 text-center border-b-2 font-medium text-sm ${
              activeTab === "nonRegisteredUsers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("nonRegisteredUsers")}
          >
            Non Registered Users
          </button>
        </nav>
      </div>
      <div className="mt-4">
        {activeTab === "registeredUsers" && (
          <div>
            {/* Lost content goes here */}
            {/* <p>Lost Items</p> */}
            <RegisteredUsers />
          </div>
        )}
        {activeTab === "nonRegisteredUsers" && (
          <div className="flex flex-wrap overflow-hidden py-4 justify-start md:mx-10">
            {/* Found content goes here */}
            {/* <p>Found Items</p> */}
            <NonRegisteredUsers />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllUsers;
