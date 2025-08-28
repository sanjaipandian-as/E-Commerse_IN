import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SellerLoginPage from "./pages/SellerLoginPage";
import SellerSignupPage from "./pages/SellerSignupPage";
import SellerDashboard from "./pages/SellerDashboard";
import AddProductPage from "./pages/AddProductPage";
import Profile from "./pages/Profile/ProfileHome";
import Sidebar from "./components/Sidebar";
import CartPage from "./pages/CartPage";

import { CartProvider } from "./context/CartContext";
import AboutUs from "./pages/AboutUs";

// Admin
import AdminDashboard from "./services/AdminDashboard";
import ProtectedRoute from "./services/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/seller-login" element={<SellerLoginPage />} />
          <Route path="/seller-signup" element={<SellerSignupPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/about" element={<AboutUs />} />
          
          <Route path="/seller-dashboard" element={<SellerDashboard />} />

          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
