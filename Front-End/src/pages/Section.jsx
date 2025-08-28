import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyDesign3 from "../assets/my-design3.jpg";
import { CartContext } from "../context/CartContext";
import { FaMale, FaFemale, FaChild, FaTv } from "react-icons/fa";

function Section() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  const categories = [
    { name: "Men", icon: <FaMale size={48} className="text-white" /> },
    { name: "Women", icon: <FaFemale size={48} className="text-white" /> },
    { name: "Kids", icon: <FaChild size={48} className="text-white" /> },
    { name: "Electronics", icon: <FaTv size={48} className="text-white" /> },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/products/products"
        );
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getProductImage = (imageName) => {
    if (!imageName) return "/images/no-image.jpg"; // fallback local image
    return `http://localhost:5000/uploads/${imageName}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${MyDesign3})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto flex flex-col items-center justify-center text-center px-6 py-40">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
              GET STARTED <br /> YOUR FAVORITE SHOPPING
            </h2>
            <button className="bg-black text-white px-8 py-3 font-semibold rounded-md transform transition duration-300 hover:scale-105 hover:bg-gray-900">
              BUY NOW
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
<section className="py-16">
  <div className="container mx-auto">
    <h3 className="text-2xl font-semibold text-center mb-12 text-gray-800">
      Shop by Categories
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="relative rounded-lg overflow-hidden cursor-pointer shadow-lg transition transform hover:scale-105 hover:shadow-2xl bg-yellow-400 flex flex-col items-center justify-center py-16"
        >
          <div className="mb-4 animate-bounce text-white">
            {React.cloneElement(cat.icon, { className: "text-white" })}
          </div>
          <h4 className="text-white text-xl font-semibold">{cat.name}</h4>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-12">
            Featured Products
          </h3>
          {loading ? (
            <p className="text-center text-gray-600">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-6 shadow-lg rounded-lg text-center transition transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 mb-4 rounded">
                    <img
                      src={getProductImage(product.image)}
                      alt={product.name}
                      className="h-full object-contain"
                    />
                  </div>
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
                  <p className="text-gray-800 font-bold mb-3">₹{product.price}</p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() =>
                        addToCart({
                          productId: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                        })
                      }
                      className="bg-yellow-500 text-white px-5 py-2 rounded-md font-medium hover:bg-yellow-600 transition"
                    >
                      Add to Cart
                    </button>
                    <button className="border border-yellow-500 text-yellow-600 px-5 py-2 rounded-md font-medium hover:bg-yellow-50 transition">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Section;
