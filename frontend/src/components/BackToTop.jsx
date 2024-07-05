import React, { useEffect, useState } from "react";

function BackToTop() {
  const [backToTop, setBackToTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyles = {
    position: "fixed",
    bottom: "37px",
    right: "16px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s",
  };

  return (
    <div>
      {backToTop && (
        <button
          style={buttonStyles}
          onClick={scrollUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="black"
            className="bi bi-arrow-up-circle-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
              stroke="black"
              strokeWidth="0.25"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default BackToTop;
