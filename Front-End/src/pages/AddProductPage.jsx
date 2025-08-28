import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaSave, FaPlusCircle, FaTimesCircle } from "react-icons/fa";

// Reusable validation error component
const ValidationError = ({ message }) =>
  message ? <p className="text-red-500 text-sm mt-1">{message}</p> : null;

const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Handle form submit
  const onSubmit = async (data, shouldNavigate = true) => {
    setApiError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) throw new Error("You must be logged in to add a product.");
      const token = JSON.parse(userInfo).token;

      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      if (image) formData.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("http://localhost:5000/api/products/products", formData, config);

      setSuccess("Product added successfully! 🎉");
      setLoading(false);

      if (shouldNavigate) {
        setTimeout(() => navigate("/seller-dashboard"), 1500);
      } else {
        reset();
        setImage(null);
        setImagePreview(null);
      }
    } catch (err) {
      setLoading(false);
      setApiError(err.response?.data?.message || "Failed to add product. 😔");
      console.error(err);
    }
  };

  // Handle image change
  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  // Drag & drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex justify-center items-center font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>

      {/* Floating blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Main card */}
      <div className="relative z-10 w-full h-full p-10 bg-white/90 backdrop-blur-lg shadow-2xl overflow-y-auto rounded-none">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Add New Product ✨
        </h2>

        {apiError && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm flex items-center justify-center border border-red-200">
            <FaTimesCircle className="mr-2 text-lg" />
            {apiError}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm flex items-center justify-center border border-green-200">
            <FaPlusCircle className="mr-2 text-lg" />
            {success}
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit((data) => onSubmit(data, true))}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image Upload */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`flex flex-col justify-center items-center cursor-pointer min-h-[400px] lg:min-h-[70vh] w-full bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                dragOver
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-purple-400 hover:shadow-lg"
              }`}
              onClick={() => document.getElementById("fileUpload").click()}
            >
              {imagePreview ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="max-h-[65vh] w-auto object-contain rounded-xl shadow-md border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageChange(null)}
                    className="absolute top-3 right-3 p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    <FaTimesCircle />
                  </button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <FaCloudUploadAlt className="mx-auto h-20 w-20 text-purple-400 mb-4" />
                  <span className="block text-lg font-semibold text-gray-800">Upload Product Image</span>
                  <p className="mt-2 text-sm text-gray-500">Drag & drop or click to browse</p>
                </div>
              )}

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
              <ValidationError message={errors.image?.message} />
            </div>

            {/* Form Fields */}
            <div className="space-y-11 flex flex-col justify-center lg:pb-10">
              {/* Product Name */}
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Product Name *</label>
                <input
                  type="text"
                  {...register("name", { required: "Product name is required." })}
                  className={`w-full px-5 py-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:outline-none transition-shadow duration-300 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Men's Running Shoes"
                />
                <ValidationError message={errors.name?.message} />
              </div>

              {/* Description */}
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Description *</label>
                <textarea
                  {...register("description", { required: "Description is required." })}
                  className={`w-full px-5 py-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:outline-none transition-shadow duration-300 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  rows="5"
                  placeholder="Provide a detailed description..."
                />
                <ValidationError message={errors.description?.message} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-1">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: "Price is required.", min: { value: 0.01, message: "Price must be greater than 0." } })}
                    className={`w-full px-5 py-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:outline-none transition-shadow duration-300 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 45.99"
                  />
                  <ValidationError message={errors.price?.message} />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-1">Stock *</label>
                  <input
                    type="number"
                    {...register("stock", { required: "Stock is required.", min: { value: 0, message: "Stock cannot be negative." } })}
                    className={`w-full px-5 py-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:outline-none transition-shadow duration-300 ${
                      errors.stock ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 100"
                  />
                  <ValidationError message={errors.stock?.message} />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Category *</label>
                <select
                  {...register("category", { required: "Category is required." })}
                  className={`w-full px-5 py-4 border rounded-xl focus:ring-4 focus:ring-purple-200 focus:outline-none bg-white transition-shadow duration-300 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Other">Other</option>
                </select>
                <ValidationError message={errors.category?.message} />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
              onClick={() => navigate("/seller-dashboard")}
            >
              <FaTimesCircle className="mr-2" /> CANCEL
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <FaSave className="mr-2" />
              {loading ? "SAVING..." : "SAVE"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit((data) => onSubmit(data, false))}
              className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full font-bold shadow-md hover:from-gray-500 hover:to-gray-700 transition-all duration-300 flex items-center justify-center"
            >
              <FaPlusCircle className="mr-2" />
              SAVE & ADD ANOTHER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
