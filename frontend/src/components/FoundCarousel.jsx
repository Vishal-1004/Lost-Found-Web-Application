import { useState, useEffect, useRef } from 'react';
import FoundCard from './FoundCard';
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
];

function FoundCarousel({heading}) {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // auto-scrolling
  useEffect(() => {
    const container = containerRef.current;
    intervalRef.current = setInterval(() => {
      if (container && !container.classList.contains('hovering')) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        let newScrollLeft = scrollLeft + 316;
        if (newScrollLeft + clientWidth >= (scrollWidth + 316)) {
          newScrollLeft = 0;
        }
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
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
    const container = containerRef.current;
    if (container) {
      clearInterval(intervalRef.current);
      container.scrollTo({
        left: container.scrollLeft - 316,
        behavior: 'smooth'
      });
      startAutoScroll();
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      clearInterval(intervalRef.current);
      container.scrollTo({
        left: container.scrollLeft + 316,
        behavior: 'smooth'
      });
      startAutoScroll();
    }
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      const container = containerRef.current;
      if (container && !container.classList.contains('hovering')) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        let newScrollLeft = scrollLeft + 316;
        if (newScrollLeft + clientWidth >= (scrollWidth + 316)) {
          newScrollLeft = 0;
        }
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    }, 3000);
  };

  const handleMouseEnter = () => {
    const container = containerRef.current;
    if (container) {
      container.classList.add('hovering');
    }
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (container) {
      container.classList.remove('hovering');
    }
  };

  return (
    <div className="relative px-4 sm:px-12">
      <style>
        {`
          #carouselContainer {
              scrollbar-width: none;
          }
        `}
      </style>
      <h2 className="text-gray-700 text-left text-2xl font-semibold mt-4 ml-2 sm:ml-4">{heading}</h2>
      <div
        ref={containerRef}
        id="carouselContainer"
        className="flex overflow-x-scroll space-x-4 sm:p-4 transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
          className="absolute top-1/2 left-2 sm:left-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20"
          onClick={scrollLeft}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FiChevronLeft size={24} />
        </button>
      )}

      {showRightButton && (
        <button
          className="absolute top-1/2 right-2 sm:right-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20"
          onClick={scrollRight}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FiChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

export default FoundCarousel;
