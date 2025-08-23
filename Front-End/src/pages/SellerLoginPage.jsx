import React, { useState } from "react";
import axios from "axios";
import MyDesign2 from "../assets/my-design2.jpg"; // adjust path if needed

const SellerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/seller/login", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      // Using a custom message box instead of alert()
      const messageBox = document.createElement("div");
      messageBox.innerText = "Seller Login Successful!";
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
        window.location.href = "/seller-dashboard"; // Redirect to seller dashboard
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-[420px] p-10 shadow-xl rounded-2xl border border-gray-100">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold text-orange-500 mb-2">Luxvia</h1>
          <p className="text-gray-500 mb-1">Welcome back, Seller 👋</p>
          <h2 className="text-2xl font-bold mb-8">Sign in to your seller account</h2>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
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

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-gray-600">Password</label>
                <a href="#" className="text-sm text-orange-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
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
              SIGN IN →
            </button>
          </form>

          {/* Signup link */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            New Seller?{" "}
            <a href="/Seller-Signup" className="text-orange-500 font-medium hover:underline">
              Signup Here 
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="w-1/2 bg-orange-50 flex items-center justify-center">
        <img
          src={MyDesign2}
          alt="Seller login illustration"
          className="w-[450px] h-auto drop-shadow-lg"
        />
      </div>
    </div>
  );
}

export default SellerLoginPage;