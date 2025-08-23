import React from 'react';
import { FaTshirt, FaMobileAlt, FaChild, FaUserTie } from "react-icons/fa";

function Section() {
  const categories = [
    { name: "Men", icon: <FaUserTie size={28} /> },
    { name: "Women", icon: <FaTshirt size={28} /> },
    { name: "Kids", icon: <FaChild size={28} /> },
    { name: "Electronics", icon: <FaMobileAlt size={28} /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-20">
          {/* Text */}
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              GET STARTED <br /> YOUR FAVORITE SHOPPING
            </h2>
            <button className="bg-black text-white px-8 py-3 font-semibold rounded-md transform transition duration-300 hover:scale-105 hover:bg-gray-900">
              BUY NOW
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcCC2bZv4E8yoZIxw-t2GHMZlHOGHXSx7pw&s"
              alt="Shopping Banner"
              className="w-80 md:w-[400px] lg:w-[500px] rounded-lg shadow-lg transform transition hover:scale-105"
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
          ◀
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
          ▶
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-12">Shop by Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-gray-100 p-10 text-center rounded-lg font-medium hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-white cursor-pointer shadow transition transform hover:scale-105"
              >
                <div className="mb-3 flex justify-center">{cat.icon}</div>
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-12">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((prod) => (
              <div
                key={prod}
                className="bg-white p-6 shadow-lg rounded-lg text-center transition transform hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 mb-4 rounded"></div>
                <h4 className="font-semibold text-lg">Product {prod}</h4>
                <p className="text-gray-600 mb-3">$99.99</p>
                <div className="flex justify-center space-x-3">
                  <button className="bg-yellow-500 text-white px-5 py-2 rounded-md font-medium hover:bg-yellow-600 transition">
                    Add to Cart
                  </button>
                  <button className="border border-yellow-500 text-yellow-600 px-5 py-2 rounded-md font-medium hover:bg-yellow-50 transition">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section;
