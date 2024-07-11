// src/components/Tabs.js
import { useState } from 'react';
// import ItemCarousel from './ItemCarousel';
// import UserFoundation from './UserFound';
import ItemCard from './ItemCard';
function Tabs() {
  const [activeTab, setActiveTab] = useState('Lost');

  return (
    <div className="w-full mt-10">
      <div className="w-full border-gray-200">
        <nav className="flex justify-center">
          <button
            className={`w-full max-w-xs py-4 text-center border-b-2 font-medium text-sm ${activeTab === 'Lost' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('Lost')}
          >
            Lost
          </button>
          <button
            className={`w-full max-w-xs py-4 text-center border-b-2 font-medium text-sm ${activeTab === 'Found' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('Found')}
          >
            Found
          </button>
        </nav>
      </div>
      <div className="mt-4">
        {activeTab === 'Lost' && (
          <div>
            {/* Lost content goes here */}
            <p>Lost Items</p>
          </div>
        )}
        {activeTab === 'Found' && (
          <div className='flex flex-wrap overflow-hidden py-4 justify-center'>
            {/* Found content goes here */}
            {/* <p>Found Items</p> */}
            <ItemCard url = {"https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg"} 
            title= {"Sample Card"}
            date ={"2024-07-07"}
            about={"Lorem Ipsum Lorem Ipsum"}
            location={"AB3"}/>
             <ItemCard url = {"https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg"} 
            title= {"Sample Card"}
            date ={"2024-07-07"}
            about={"Lorem Ipsum Lorem Ipsum"}
            location={"AB3"}/>
             <ItemCard url = {"https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg"} 
            title= {"Sample Card"}
            date ={"2024-07-07"}
            about={"Lorem Ipsum Lorem Ipsum"}
            location={"AB3"}/>
             <ItemCard url = {"https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg"} 
            title= {"Sample Card"}
            date ={"2024-07-07"}
            about={"Lorem Ipsum Lorem Ipsum"}
            location={"AB3"}/>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default Tabs;
