// import React from 'react';
import LineChart from "./LineChart";

const ColumnsWithChart = () => {
  return (
    <div className="container mx-auto ps-8 pe-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 bg-blue-50">
          <h1 className="text-2xl text-center">Other Important Stuff Here</h1>
        </div>
        <div className="w-full md:w-1/2 mx-auto ">
          <LineChart/>
        </div>
      </div>
    </div>
  );
};

export default ColumnsWithChart;
