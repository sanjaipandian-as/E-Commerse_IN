import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty. <Link to="/" className="text-orange-500 underline">Shop now!</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-orange-500 font-bold">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                    className="w-16 p-1 border rounded text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-80 p-4 border rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </p>
            <p className="flex justify-between mb-4 font-bold text-orange-500">
              <span>Total Price:</span>
              <span>₹{totalPrice}</span>
            </p>
            <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
