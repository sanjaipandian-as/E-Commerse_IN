import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { FaInfoCircle } from "react-icons/fa"; // About Us icon

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // regular user login
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false); // seller login
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const sellerInfo = localStorage.getItem("sellerInfo"); // assuming you store seller login here

    if (userInfo) setIsLoggedIn(true);
    if (sellerInfo) setIsSellerLoggedIn(true);
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    navigate("/"); // redirect home after logout
  };

  const handleSellerLogout = () => {
    localStorage.removeItem("sellerInfo");
    setIsSellerLoggedIn(false);
    navigate("/"); // redirect home after seller logout
  };

  return (
    <div className="font-sans">
      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-3 gap-6">
          {/* Left Section - Logo + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-700 hover:text-orange-600 focus:outline-none"
            >
              <HiMenu size={28} />
            </button>
            <h1 className="text-2xl font-extrabold text-yellow-600 tracking-wide hover:text-orange-500 transition">
              Luxvia
            </h1>
          </div>

          {/* Middle Section - Search */}
          <div className="hidden md:flex flex-1 items-center max-w-xl border rounded-full overflow-hidden bg-white shadow-sm hover:shadow-md transition">
            <select className="px-3 py-2 border-r outline-none text-sm bg-white text-gray-600 cursor-pointer focus:ring-2 focus:ring-yellow-400">
              <option>All Category</option>
              <option>Men</option>
              <option>Women</option>
              <option>Electronics</option>
            </select>
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-2 outline-none text-sm"
            />
            <button className="bg-orange-500 px-5 py-2.5 text-white text-sm hover:bg-orange-600 transition">
              🔍
            </button>
          </div>

          {/* Right Section - Language, Profile, Login/Logout, About Us */}
          <div className="hidden md:flex items-center space-x-4">
            <select className="border px-2 py-1 text-sm rounded-md bg-white text-gray-600 cursor-pointer focus:ring-2 focus:ring-yellow-400 hover:border-orange-400 transition">
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
            </select>

            <Link
              to="/profile"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-md transition"
            >
              <span>👤</span>
              <span className="uppercase font-medium">Profile</span>
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleUserLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-md font-medium transition"
              >
                <RiLoginBoxFill className="text-lg" />
                <span className="uppercase">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-md font-medium transition"
              >
                <RiLoginBoxFill className="text-lg" />
                <span className="uppercase">Login</span>
              </Link>
            )}

            {/* About Us */}
            <Link
              to="/about"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-md font-medium transition"
            >
              <FaInfoCircle className="text-lg" />
              <span className="uppercase">About Us</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar + Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 text-gray-900">
          <h2 className="text-xl font-bold"></h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <HiX size={26} />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-gray-900 font-medium">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className={`px-4 py-3 text-lg rounded-md transition font-semibold ${
              location.pathname === "/"
                ? "bg-orange-500 text-white shadow-md"
                : "hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsSidebarOpen(false)}
            className={`px-4 py-3 text-lg rounded-md transition font-semibold ${
              location.pathname === "/profile"
                ? "bg-orange-500 text-white shadow-md"
                : "hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            Profile
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsSidebarOpen(false)}
            className={`px-4 py-3 text-lg rounded-md transition font-semibold ${
              location.pathname === "/cart"
                ? "bg-orange-500 text-white shadow-md"
                : "hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            Cart
          </Link>

          {/* Conditional Seller Links */}
          {!isSellerLoggedIn ? (
            <button
              onClick={() => {
                if (isLoggedIn) navigate("/seller-login");
                else alert("Please login first to access Seller Login");
              }}
              className="px-4 py-3 text-lg rounded-md transition font-semibold text-gray-700 hover:bg-orange-100 hover:text-orange-600 text-left"
            >
              Seller Login
            </button>
          ) : (
            <Link
              to="/seller-dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-3 text-lg rounded-md transition font-semibold ${
                location.pathname === "/seller-dashboard"
                  ? "bg-orange-500 text-white shadow-md"
                  : "hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              Seller Dashboard
            </Link>
          )}

          {/* About Us */}
          <Link
            to="/about"
            onClick={() => setIsSidebarOpen(false)}
            className={`px-4 py-3 text-lg rounded-md transition font-semibold flex items-center space-x-2 ${
              location.pathname === "/about"
                ? "bg-orange-500 text-white shadow-md"
                : "hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            <FaInfoCircle className="text-lg" />
            <span>About Us</span>
          </Link>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden border-t mt-4 p-4">
          <div className="flex items-center border rounded-full overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 outline-none text-sm bg-white"
            />
            <button className="bg-orange-500 px-5 py-3 text-white text-sm hover:bg-orange-600 transition">
              🔍
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
