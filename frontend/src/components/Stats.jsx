import Doughnut from "./DoughnutChart";
import { useState } from "react";
import SecondChart from "./SecondChart";



 function Stats() {
  const [profileTab,setProfileTab] = useState("All");
  return (
    <div className="w-full md:w-1/2 bg-blue-100 p-4 mt-4 md:mt-0">
      <h2 className="text-lg font-semibold"></h2>
      <div className="w-full" >
        <nav className="flex justify-center py-2">
            <button className={`p-1 w-full text-center border-b font-medium text-sm 
              ${profileTab === 'All'? ` border-blue-500`:"border-transparent"} `} 
              onClick={()=>setProfileTab("All")}>All</button>
              <button className={` p-1 w-full text-center border-b font-medium text-sm 
              ${profileTab === 'Lost'? ` border-blue-500`:"border-transparent"} `} 
              onClick={()=>setProfileTab("Lost")}>Lost</button>
              <button className={`p-1 w-full text-center border-b font-medium text-sm 
              ${profileTab === 'Found'? ` border-blue-500`:"border-transparent"} `} 
              onClick={()=>setProfileTab("Found")}>Found</button>
        </nav>
        <div className="mt-4">
          {profileTab === "All" && (
            <div className="py-1">
            <Doughnut />
            </div>
          )}
          {profileTab === "Lost" && (
            <div className="py-1">
              <SecondChart tab="Lost"/>
            </div>
          )}
          {profileTab === "Found" && (
            <div className="py-1">
              <SecondChart tab="Found"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default Stats;