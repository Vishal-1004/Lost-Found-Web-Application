import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import ItemCard from './ItemCard';
import DetailedViewPopup from "./DetailedViewPopup";
import { getFoundItemsFunction } from "../services/API";
import moment from "moment";
import { ErrorComponent, LoadingComponent, NoDataComponent } from "../utility";
import { useDispatch, useSelector } from "react-redux";
import { doneFetchingData } from "../actions";

function ItemCarousel({ heading }) {
  const dispatch = useDispatch();

  const [postData, setPostData] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(false);

  const getRecentFoundPost = async () => {
    setFormLoading(true);
    try {
      const all = 0;
      const count = 6;
      const response = await getFoundItemsFunction(all, count);
      //console.log(response);
      setError(false);
      setPostData(response.data.data);
    } catch (error) {
      setError(true);
      //ToastMsg("Server error! please try later", "error");
      //console.log("Internal Server Error: ", error);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    getRecentFoundPost();
  }, []);

  // Fetching data again when ever a new post is created **********************
  const fetchData = useSelector((state) => state.dataFetching.fetchData);
  useEffect(() => {
    const reFetchData = async () => {
      await getRecentFoundPost();
      dispatch(doneFetchingData());
    };

    if (fetchData == true) {
      reFetchData();
    }
  }, [fetchData]);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // auto-scrolling starts here **********************************************************
  useEffect(() => {
    const container = containerRef.current;
    intervalRef.current = setInterval(() => {
      if (container && !container.classList.contains("hovering")) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        let newScrollLeft = scrollLeft + 316;
        if (newScrollLeft + clientWidth >= scrollWidth + 316) {
          newScrollLeft = 0;
        }
        container.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
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
        setShowRightButton(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      clearInterval(intervalRef.current);
      container.scrollTo({
        left: container.scrollLeft - 316,
        behavior: "smooth",
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
        behavior: "smooth",
      });
      startAutoScroll();
    }
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      const container = containerRef.current;
      if (container && !container.classList.contains("hovering")) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        let newScrollLeft = scrollLeft + 316;
        if (newScrollLeft + clientWidth >= scrollWidth + 316) {
          newScrollLeft = 0;
        }
        container.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }
    }, 3000);
  };

  const handleMouseEnter = () => {
    const container = containerRef.current;
    if (container) {
      container.classList.add("hovering");
    }
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (container) {
      container.classList.remove("hovering");
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };
  // Scrolling ends here ***********************************

  return (
    <div className="relative px-4 mb-5 sm:px-12">
      <style>
        {`
          #carouselContainer {
              scrollbar-width: none;
          }
        `}
      </style>
      <h2 className="text-[28px] sm:text-[36px] font-bold text-gray-700 py-2 text-left mt-4 ml-2 sm:ml-4">
        {heading}
      </h2>

      {formLoading ? (
        <LoadingComponent loading={formLoading} />
      ) : error ? (
        <ErrorComponent />
      ) : postData.length == 0 ? (
        <NoDataComponent />
      ) : (
        <>
          <div
            ref={containerRef}
            id="carouselContainer"
            className="flex overflow-x-scroll space-x-4 sm:p-4 transition-all duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {postData.map((item, index) => (
              <div key={index} onClick={() => handleCardClick(item)}>
                <ItemCard
                  url={item.itemImage}
                  title={item.title}
                  date={moment(item.date).format("ddd, D MMM YYYY")}
                  about={item.description}
                  location={item.location}
                />
              </div>
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

          {selectedItem && (
            <DetailedViewPopup item={selectedItem} onClose={handleClosePopup} />
          )}
        </>
      )}
    </div>
  );
}

export default ItemCarousel;

  //  {formLoading ? (
  //           <>
  //             <FaSpinner className="mr-3 animate-spin" />
  //             Loading...
  //           </>
  //         ) : (
  //           <div
  //             ref={containerRef}
  //             id="carouselContainer"
  //             className="flex overflow-x-scroll space-x-4 sm:p-4 transition-all duration-300"
  //             onMouseEnter={handleMouseEnter}
  //             onMouseLeave={handleMouseLeave}
  //           >
  //             {postData?.map((item, index) => (
  //               <div key={index} onClick={() => handleCardClick(item)}>
  //                 <ItemCard
  //                   url={item.itemImage}
  //                   title={item.title}
  //                   date={item.date}
  //                   about={item.description}
  //                   location={item.location}
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //         )}