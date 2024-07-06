import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();
  const menuRef = useRef();
  const buttonRef = useRef();

  // function to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // function to handle out of navbar clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(e.target) && 
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Navbar that appears for laptop screens */}
      <nav className="w-full px-4 sm:px-9 bg-white flex shadow border-gray-400 text-gray-500 justify-between items-center h-[10vh]" ref={navRef}>
        <Link to="/" className="ml-4">
          <img
            className="collapse absolute sm:w-[150px] sm:visible"
            src="https://cdn.codechef.com/images/cc-logo.svg"
            alt="Website Logo"
          />
          <img
            className="sm:collapse"
            src="https://cdn.codechef.com/images/cc-logo-mobile-1.svg"
            alt="Website Logo"
          />
        </Link>
        <div className="hidden sm:flex">
          <div className="mx-2 block">
            <Link
              to="/lost"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
            >
              <button>Lost</button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/found"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
            >
              <button>Found</button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/login"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
            >
              <button>Login</button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/profile"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e] flex items-center"
            >
              <button className="flex items-center">
                <FaUserCircle size={"32px"} />
              </button>
            </Link>
          </div>
        </div>
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none" ref={buttonRef}>
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 6h16m-16 6h16m-16 6h16"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </nav>
      {/* Burger menu for mobile screens */}
      {menuOpen && (
        <div ref={menuRef} className="sm:hidden absolute top-[7vh] right-4 bg-white shadow-lg rounded-lg z-50 w-40 py-2 border">
          <div className="mx-2 block">
            <Link
              to="/lost"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
              onClick={() => setMenuOpen(false)}
            >
              <button>Lost</button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/found"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
              onClick={() => setMenuOpen(false)}
            >
              <button>Found</button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/login"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
              onClick={() => setMenuOpen(false)}
            >
              <button>Login</button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/profile"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e] flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              <button className="flex items-center">
                <FaUserCircle size={"32px"} />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;