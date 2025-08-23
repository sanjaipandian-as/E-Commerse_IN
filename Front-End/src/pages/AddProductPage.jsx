import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  // State to manage form inputs, matching the backend model
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // State for error and success messages
  const [apiError, setApiError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Client-side validation function
  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Product name is required.";
    if (!description.trim()) errors.description = "Description is required.";
    if (!price || price <= 0) errors.price = "Price must be a number greater than 0.";
    if (stock === "" || stock < 0) errors.stock = "Stock must be a non-negative number.";
    if (!category) errors.category = "Category is required.";
    if (!image) errors.image = "Product image is required.";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Main form submission handler
  const handleFormSubmit = async (e, shouldNavigate = true) => {
    e.preventDefault();
    setApiError(null);
    setSuccess(null);
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        throw new Error("You must be logged in to add a product.");
      }
      const token = JSON.parse(userInfo).token;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("http://localhost:5000/api/products", formData, config);
      
      setSuccess("Product added successfully!");
      setLoading(false);
      
      if (shouldNavigate) {
        setTimeout(() => {
          navigate("/seller-dashboard");
        }, 1500);
      } else {
        // Reset the form for adding another product
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategory("");
        setImage(null);
        setImagePreview(null);
      }

    } catch (err) {
      setLoading(false);
      setApiError(err.response?.data?.message || "Failed to add product.");
      console.error(err);
    }
  };

  // Handler for image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

        {apiError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
            {apiError}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm">
            {success}
          </div>
        )}

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Upload Box */}
            <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-64">
              {imagePreview ? (
                <img src={imagePreview} alt="Product Preview" className="h-full w-full object-cover rounded-lg" />
              ) : (
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Product Image *
                  </span>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-2 w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
              />
               {validationErrors.image && <p className="text-red-500 text-xs mt-1">{validationErrors.image}</p>}
            </div>

            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none ${validationErrors.name ? 'border-red-500' : ''}`}
                  placeholder="e.g., Men's Running Shoes"
                />
                {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none ${validationErrors.description ? 'border-red-500' : ''}`}
                  rows="3"
                  placeholder="Provide a detailed description of the product..."
                />
                {validationErrors.description && <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none ${validationErrors.price ? 'border-red-500' : ''}`}
                  placeholder="e.g., 45.99"
                  min="0.01"
                  step="0.01"
                />
                {validationErrors.price && <p className="text-red-500 text-xs mt-1">{validationErrors.price}</p>}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none ${validationErrors.stock ? 'border-red-500' : ''}`}
                  placeholder="e.g., 100"
                  min="0"
                />
                {validationErrors.stock && <p className="text-red-500 text-xs mt-1">{validationErrors.stock}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white ${validationErrors.category ? 'border-red-500' : ''}`}
                >
                  <option value="">Select a category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Other">Other</option>
                </select>
                {validationErrors.category && <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border rounded-md text-gray-700 font-medium hover:bg-gray-100 transition"
              onClick={() => navigate("/seller-dashboard")}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
              disabled={loading}
              onClick={(e) => handleFormSubmit(e, true)}
            >
              SAVE
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
              disabled={loading}
              onClick={(e) => handleFormSubmit(e, false)}
            >
              SAVE & ADD ANOTHER 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
