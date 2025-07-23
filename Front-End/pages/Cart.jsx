import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="mb-4">Your cart is empty.</p>
          <Link
  to="/"
  className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
>
  Continue Shopping
</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-xl shadow p-4 border"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-gray-50 p-4 rounded-xl border">
            <p className="text-xl font-bold text-gray-800">
              Total: ₹{totalAmount}
            </p>

            <div className="flex gap-4 mt-4 sm:mt-0">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
              >
                Clear Cart
              </button>

              <Link
                to="/checkout"
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
