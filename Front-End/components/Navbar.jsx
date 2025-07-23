import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { AuthProvider } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-indigo-600">MyEcom</Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          {user && <Link to="/profile" className="text-gray-700 hover:text-indigo-600">Profile</Link>}
          {user && user.role === "seller" && <Link to="/seller-dashboard" className="text-gray-700 hover:text-indigo-600">Seller</Link>}
          {user && user.role === "admin" && <Link to="/admin-dashboard" className="text-gray-700 hover:text-indigo-600">Admin</Link>}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
