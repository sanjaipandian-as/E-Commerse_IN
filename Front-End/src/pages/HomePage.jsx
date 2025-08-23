import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the user's token in local storage on component mount
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    // Optional: Redirect to login page
    // window.location.href = "/login";
  };

  return (
    <div className="font-sans">
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-6 py-4 gap-6">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold text-yellow-600 whitespace-nowrap">
            Luxvia
          </h1>

          {/* Search bar */}
          <div className="flex flex-1 items-center max-w-xl border rounded-md overflow-hidden">
            <select className="px-3 py-2 border-r outline-none text-sm bg-white text-gray-700 cursor-pointer focus:ring-2 focus:ring-yellow-400">
              <option>All Category</option>
              <option>Men</option>
              <option>Women</option>
              <option>Electronics</option>
            </select>
            <input
              type="text"
              placeholder="Search this blog"
              className="flex-1 px-3 py-2 outline-none text-sm"
            />
            <button className="bg-orange-500 px-4 py-2 text-white text-sm hover:bg-orange-600 transition">
              🔍
            </button>
          </div>

          {/* Right side - Conditional rendering */}
          <div className="flex items-center space-x-4">
            <select className="border px-2 py-1 text-sm bg-white text-gray-700 cursor-pointer focus:ring-2 focus:ring-yellow-400">
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
            </select>
            <Link
              to="/cart"
              className="flex items-center space-x-1 text-gray-700 hover:text-yellow-600"
            >
              <span>🛒</span> <span className="uppercase">Cart</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-1 text-gray-700 hover:text-yellow-600"
            >
              <span>👤</span> <span className="uppercase">Profile</span>
            </Link>

            {/* Conditional rendering for Login/Logout and Seller Login buttons */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/seller-login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-yellow-600 font-medium"
                >
                  <RiLoginBoxFill className="text-lg" />
                  <span className="uppercase">Seller Login</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-yellow-600 font-medium"
                >
                  <RiLoginBoxFill className="text-lg" />
                  <span className="uppercase">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-yellow-600 font-medium"
              >
                <RiLoginBoxFill className="text-lg" />
                <span className="uppercase">Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;