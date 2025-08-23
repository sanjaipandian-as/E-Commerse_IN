import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import axios from "axios";

const SellerDashboard = () => {
  // State to hold the user data fetched from the API
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch the user's profile from the backend
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
          setError("You must be logged in to view this page.");
          setLoading(false);
          return;
        }

        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.token;
        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }

        // Make an authenticated API call to the /me endpoint
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get("http://localhost:5000/api/users/me", config);

        setUserData(data);
        setLoading(false);

      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError(err.response?.data?.message || "Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // The empty array ensures this effect runs only once on mount

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  // Display a loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-sans">
        <p className="text-xl text-gray-600">Loading seller dashboard...</p>
      </div>
    );
  }

  // Display an error message if the fetch failed
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen font-sans text-center">
        <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Display the dashboard with user data
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Left Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md flex flex-col items-center">
        {/* Profile section */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://placehold.co/100x100/A3A3A3/FFFFFF?text=P"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2 border border-gray-300"
          />
          <h3 className="font-semibold text-lg text-gray-800">
            {userData.username || "Jack Smith"}
          </h3>
          <p className="text-sm text-gray-500">
            Royalty Balance: <span className="font-semibold text-gray-700">$447,298</span>
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-8 w-full text-left">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-2 p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium">
                <span className="text-lg">📦</span>
                <span>My products</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:bg-gray-200">
                <span className="text-lg">💰</span>
                <span>My sales</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:bg-gray-200">
                <span className="text-lg">⚖️</span>
                <span>My disputes</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:bg-gray-200">
                <span className="text-lg">✏️</span>
                <span>Edit profile</span>
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center space-x-2 p-2 rounded-md text-red-500 hover:bg-red-50 w-full text-left">
                <span className="text-lg">🚪</span>
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {/* Header with actions */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-300 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My products</h2>
          <div className="flex items-center space-x-4">
            <Link
              to="/add-product"
              className="flex items-center space-x-1 px-4 py-2 bg-yellow-500 text-white rounded-md font-medium hover:bg-yellow-600"
            >
              <span>+</span>
              <span>Add new product</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>Sort by</span>
              <select className="px-2 py-1 border rounded-md">
                <option>All</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        
      </div>
    </div>
  );
};

export default SellerDashboard;
