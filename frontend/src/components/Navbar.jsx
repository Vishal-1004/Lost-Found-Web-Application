import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../actions";

const Navbar = () => {
  const [eventsClicked, setEventsClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef();
  const menuRef = useRef();
  const buttonRef = useRef();
  const userDropdownRef = useRef();

  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.storedUserData.userToken);
  const userStatus = useSelector((state) => state.storedUserData.userStatus);
  const userName = useSelector(
    (state) => state.storedUserData.userData.userName
  );

  // function to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setEventsClicked(false);
      }
    };

    if (menuOpen || eventsClicked) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, eventsClicked]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Removing user data from Redux store
    dispatch(removeUserData());
  };

  return (
    <div>
      {/* Navbar that appears for laptop screens */}
      <nav
        className="w-full px-4 sm:px-9 bg-white flex shadow border-gray-400 text-gray-500 justify-between items-center h-[10vh]"
        ref={navRef}
      >
        <Link to="/" className="ml-4">
          <img
            className="collapse absolute sm:w-[150px] md:visible"
            src="https://cdn.codechef.com/images/cc-logo.svg"
            alt="Website Logo"
          />
          <img
            className="md:collapse"
            src="https://cdn.codechef.com/images/cc-logo-mobile-1.svg"
            alt="Website Logo"
          />
        </Link>
        <div className="hidden sm:flex">
          <div className="mx-2 block">
            <Link
              to="/lost"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e] coursor-pointer"
            >
              <button>
                Lost 
                <p className='hidden lg:inline-block'>&nbsp;Items</p>
              </button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/found"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e] coursor-pointer"
            >
              <button>
                Found 
                <p className='hidden lg:inline-block'>&nbsp;Items</p>
              </button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/return-item"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e] coursor-pointer"
            >
              <button>
                Returned 
                <p className='hidden lg:inline-block'>&nbsp;Items</p>
              </button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/about-us"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e] coursor-pointer"
            >
              <button>About Us</button>
            </Link>
          </div>
          {userToken ? (
            <div className="mx-2 block" ref={userDropdownRef}>
              <div
                onClick={() => {
                  setEventsClicked(!eventsClicked);
                }}
                className="px-4 py-2 rounded hover:bg-[#2a67b11e] coursor-pointer flex items-center"
              >
                <button className="flex items-center">
                  <FaUserCircle size={"32px"} className="mx-1" /> Hello{" "}
                  {userToken && userName ? userName.split(" ")[0] : userName}
                </button>
              </div>
              <div
                className={
                  eventsClicked
                    ? "flex absolute justify-start text-[0.9rem] w-[8rem]  bg-white shadow-lg rounded mt-2 flex-col space-y-2 z-10"
                    : "hidden"
                }
              >
                <Link
                  to="/profile"
                  onClick={() => {
                    setEventsClicked(!eventsClicked);
                  }}
                  className=" hover:bg-[#2a67b11e] p-2 px-4 rounded coursor-pointer"
                >
                  <button>My Profile</button>
                </Link>
                <Link
                  to="/edit-profile"
                  onClick={() => {
                    setEventsClicked(!eventsClicked);
                  }}
                  className=" hover:bg-[#2a67b11e] p-2 px-4 rounded coursor-pointer"
                >
                  <button>Edit Profile</button>
                </Link>
                {userStatus == "ADMIN" ? (
                  <Link
                    to="/registered-users"
                    onClick={() => {
                      setEventsClicked(!eventsClicked);
                    }}
                    className=" hover:bg-[#2a67b11e] p-2 px-4 rounded coursor-pointer"
                  >
                    <button>All Users</button>
                  </Link>
                ) : null}
                <div
                  className="hover:bg-[#2a67b11e] p-2 px-4 rounded cursor-pointer"
                  onClick={() => {
                    setEventsClicked(!eventsClicked);
                    handleLogout();
                  }}
                >
                  <button className="text-red-500 flex items-center">
                    Logout <MdLogout className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-2 block">
              <Link
                to="/login"
                className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
              >
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            ref={buttonRef}
          >
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
        <div
          ref={menuRef}
          className="sm:hidden absolute top-[7vh] right-4 bg-white shadow-lg rounded-lg z-50 w-40 py-2 border"
        >
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
              to="/return-item"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
              onClick={() => setMenuOpen(false)}
            >
              <button>Returned</button>
            </Link>
          </div>
          <div className="mx-2 block">
            <Link
              to="/our-team"
              className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
            >
              <button>Our Team</button>
            </Link>
          </div>
          {userToken ? (
            <div className="mx-2 block" ref={userDropdownRef}>
              <div
                onClick={() => {
                  setEventsClicked(!eventsClicked);
                }}
                className="px-2 py-2 rounded hover:bg-[#2a67b11e] flex items-center"
              >
                <button className="flex items-center">
                  <FaUserCircle size={"32px"} className="mx-1" />
                  {userName.split(" ")[0] ? userName.split(" ")[0] : userName}
                </button>
              </div>
              <div
                className={
                  eventsClicked
                    ? "flex absolute justify-start text-[0.85rem]  bg-white shadow-lg rounded mt-2 flex-col space-y-2"
                    : "hidden"
                }
              >
                <Link
                  to="/profile"
                  onClick={(e) => {
                    setEventsClicked(!eventsClicked);
                    e.stopPropagation();
                  }}
                >
                  <button className=" hover:bg-[#2a67b11e] p-2 px-4 rounded">
                    My Profile
                  </button>
                </Link>
                <Link
                  to="/edit-profile"
                  onClick={(e) => {
                    setEventsClicked(!eventsClicked);
                    e.stopPropagation();
                  }}
                >
                  <button className=" hover:bg-[#2a67b11e] p-2 px-4 rounded">
                    Edit Profile
                  </button>
                </Link>
                {userStatus == "ADMIN" ? (
                  <Link
                    to="/all-users"
                    onClick={() => {
                      setEventsClicked(!eventsClicked);
                    }}
                    className=" hover:bg-[#2a67b11e] p-2 px-4 rounded coursor-pointer"
                  >
                    <button>All Users</button>
                  </Link>
                ) : null}
                <div
                  className="hover:bg-[#2a67b11e] p-2 px-4 rounded"
                  onClick={() => {
                    setEventsClicked(!eventsClicked);
                    handleLogout();
                  }}
                >
                  <button className="text-red-500 flex items-center">
                    Logout <MdLogout className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-2 block">
              <Link
                to="/login"
                className="block px-4 py-2 rounded hover:bg-[#2a67b11e]"
              >
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
