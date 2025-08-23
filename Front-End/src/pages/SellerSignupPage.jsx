import React, { useState } from "react";
import axios from "axios";
import MyDesign1 from "../assets/my-design1.png"; // adjust path if needed

const SellerSignupPage = () => {
  // State to manage form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // API call to the backend for seller registration
      // Note the new endpoint specifically for sellers
      const { data } = await axios.post("http://localhost:5000/api/users/seller/signup", {
        username: name,
        email,
        password,
      });

      // Handle successful registration, e.g., save user info and redirect
      localStorage.setItem("userInfo", JSON.stringify(data));
      // Using a custom message box instead of alert()
      const messageBox = document.createElement("div");
      messageBox.innerText = "Seller Registration Successful!";
      messageBox.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4caf50;
        color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
      `;
      document.body.appendChild(messageBox);
      setTimeout(() => {
        messageBox.remove();
        window.location.href = "/seller-login"; // Redirect to seller dashboard
      }, 2000);
      
    } catch (err) {
      // Handle registration errors
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      {/* Left side - Form container */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-10 shadow-xl rounded-2xl border border-gray-100">
          {/* Logo and headings */}
          <h1 className="text-3xl font-extrabold text-orange-500 mb-2">Luxvia</h1>
          <p className="text-gray-500 mb-1">Join us as a seller 👋</p>
          <h2 className="text-2xl font-bold mb-8">Create your seller account</h2>

          {/* Error message display */}
          {error && (
            <div className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-md bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-md bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-gray-600">Password</label>
              </div>
              <input
                type="password"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-md bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition duration-200"
            >
              SIGN UP →
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* Social Login */}
          <button className="w-full border py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <a href="/seller-login" className="text-orange-500 font-medium hover:underline">
              Login Here
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-orange-50">
        <img
          src={MyDesign1}
          alt="Signup illustration"
          className="w-[450px] h-auto drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default SellerSignupPage;