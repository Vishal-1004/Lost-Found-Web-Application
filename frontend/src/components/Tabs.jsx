import { useState } from "react";
import FoundTab from "./ProfileTabs/FoundTab";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Lost");

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
        {/* Lost tab section */}
        {activeTab === "Lost" && (
          <div>
            {/* lost content goes here */}
            <p>Lost Items</p>
          </div>
        )}

        {/* Fund tab section */}
        {activeTab === "Found" && <FoundTab />}
      </div>
    </div>
  );
}

export default Tabs;
