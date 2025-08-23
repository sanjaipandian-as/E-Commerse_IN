import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SellerLoginPage from './pages/SellerLoginPage'
import SellerSignupPage from './pages/SellerSignupPage'
import SellerDashboard from './pages/SellerDashboard'
import AddProductPage from './pages/AddProductPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/seller-login" element={<SellerLoginPage />} />
        <Route path="/seller-signup" element={<SellerSignupPage />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/add-product" element={<AddProductPage />} />

      </Routes>
    </Router>
  )
}

export default App
