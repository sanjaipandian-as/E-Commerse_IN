import React, { useState } from "react";
import axios from "axios";
import MyDesign from "../assets/my-design.png"; // adjust path if needed

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Login Successful!");
      window.location.href = "/";
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
          <p className="text-gray-500 mb-1">Welcome back 👋</p>
          <h2 className="text-2xl font-bold mb-8">Sign in to your account</h2>

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

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* Social Login (optional if in your design) */}
          <button className="w-full border py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            Continue with Google
          </button>

          {/* Signup link */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-orange-500 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="w-1/2 bg-orange-50 flex items-center justify-center">
        <img
          src={MyDesign}
          alt="Login illustration"
          className="w-[450px] h-auto drop-shadow-lg"
        />
      </div>
    </div>
  );
}

export default LoginPage;
