import { useState, useEffect } from 'react';
import FoundCard from './FoundCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const mockData = [
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
    {
        url: "https://www.sunglassculture.net/wp-content/uploads/Ray-Ban-Sunglass-RB3701-002-71-black-green-aviator-metal-square-driving-fishing-fashion-style-trending-mens-sunglass-culture-side.jpg",
        title: "Sunglasses",
        date: "5th July",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro eaque odit necessitatibus accusantium animi, sed quo harum? Maxime deserunt commodi consectetur necessitatibus qui explicabo eos placeat officiis, blanditiis quidem!",
        location: "Clock Court",
        detail: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos voluptatibus sequi praesentium eum veritatis commodi autem, neque est eligendi repellendus adipisci, reprehenderit fugit harum possimus dolor quasi nostrum! Vel, hic culpa dolorem eum possimus labore quidem numquam optio iure odio non. Ullam et ratione ducimus rerum optio reiciendis molestias non.",
    },
]

function FoundCarousel() {
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    useEffect(() => {
        const container = document.getElementById('carouselContainer');
        if (container) {
          setShowLeftButton(container.scrollLeft > 0);
    
          const handleScroll = () => {
            setShowLeftButton(container.scrollLeft > 0);
            setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth);
          };
    
          container.addEventListener('scroll', handleScroll);
          return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollLeft = () => {
      const container = document.getElementById('carouselContainer');
      if (container) {
        container.scrollTo({
          left: container.scrollLeft - 310,
          behavior: 'smooth'
        });
      }
    };
  
    const scrollRight = () => {
      const container = document.getElementById('carouselContainer');
      if (container) {
        container.scrollTo({
          left: container.scrollLeft + 310,
          behavior: 'smooth'
        });
      }
    };
  
    return (
      <div className="relative">
        <div id="carouselContainer" className="flex overflow-x-scroll space-x-4 p-4 transition-all duration-300">
          {mockData.map((item, index) => (
            <FoundCard 
              key={index}
              url={item.url}
              title={item.title}
              date={item.date}
              about={item.about}
              location={item.location}
              detail={item.detail}
            />
          ))}
        </div>
  
        {showLeftButton && (
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20"
                onClick={scrollLeft}
            >
                <FiChevronLeft size={24} />
            </button>
        )}
  
        {showRightButton && (
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20"
                onClick={scrollRight}
            >
                <FiChevronRight size={24} />
            </button>
        )}
      </div>
    );
}

export default FoundCarousel;
