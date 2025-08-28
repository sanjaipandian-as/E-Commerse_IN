import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SellerDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) throw new Error("You must be logged in.");

        const { token } = JSON.parse(userInfo);
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data: user } = await axios.get(
          "http://localhost:5000/api/users/me",
          config
        );
        setUserData(user);

        const { data: sellerProducts } = await axios.get(
          "http://localhost:5000/api/products/products/my-products",
          config
        );
        setProducts(sellerProducts);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  // DELETE PRODUCT
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const userInfo = localStorage.getItem("userInfo");
      const { token } = JSON.parse(userInfo);
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(
        `http://localhost:5000/api/products/products/${productId}`, // Corrected URL
        config
      );

      // Remove deleted product from UI
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-gray-100 flex flex-col justify-between p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-2 text-3xl font-bold">
            {userData?.username?.[0]?.toUpperCase() || "P"}
          </div>
          <h3 className="font-semibold text-xl">{userData?.username || "Seller"}</h3>
          <p className="text-sm text-gray-400 mt-1">
            Royalty Balance: <span className="font-semibold text-gray-200">${userData?.balance || 0}</span>
          </p>

        </div>
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <Link
                to="/seller-dashboard"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                <span>📦</span>
                <span>My products</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-lg text-red-500 hover:bg-gray-700 transition w-full text-left"
              >
                <span>🚪</span>
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Products</h2>
          <Link
            to="/add-product"
            className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            + Add new product
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-600">You have not uploaded any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                {product.image ? (
                  <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      className="h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}

                {/* Product Details */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>

                  <div className="flex justify-between mb-3">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Category:</span> {product.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Stock:</span> {product.stock}
                    </p>
                  </div>

                  <p className="text-xl font-bold text-gray-900 mb-4">₹{product.price}</p>

                  <div className="mt-auto flex space-x-3">
                    <Link
                      to={`/edit-product/${product._id}`}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm text-center rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
