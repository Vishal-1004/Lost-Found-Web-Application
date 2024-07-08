import React from 'react';

export default function Info() {
  return (
    <div className="w-full md:w-1/2 bg-gray-100 p-4 flex flex-wrap md:flex-nowrap">
      <div className="w-full md:w-1/3 mr-0 md:mr-4 mb-4 md:mb-0">
        <h2 className="text-lg font-semibold">Image</h2>
        <div className="w-32 h-32 bg-gray-300" />
      </div>
      <div className="w-full md:w-2/3 md:p-8 sm:p-3">
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-semibold">Name: <span className="text-gray-600 text-sm md:text-base">Example</span></h2>
        </div>
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-semibold">Email: <span className="text-gray-600 text-sm md:text-base">example@example.com</span></h2>
        </div>
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-semibold">Contact: <span className="text-gray-600 text-sm md:text-base">123-456-7890</span></h2>
        </div>
      </div>
    </div>
  );
}
