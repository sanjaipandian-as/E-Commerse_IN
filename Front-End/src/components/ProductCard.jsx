import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="font-semibold mt-2">{product.name}</h2>
      <p className="text-orange-500 font-bold mt-1">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
