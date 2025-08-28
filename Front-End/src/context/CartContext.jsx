import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("userToken"); // Assuming you store JWT here

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) setIsLoggedIn(true);

    if (userInfo && token) {
      // Fetch cart from backend for logged-in user
      axios
        .get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCartItems(res.data.items))
        .catch((err) => console.error(err));
    } else {
      // Load cart from localStorage for guest
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localCart);
    }
  }, [token]);

  const saveLocalCart = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = async (product) => {
    if (isLoggedIn && token) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/cart",
          { ...product, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems(res.data.items);
      } catch (err) {
        console.error(err);
      }
    } else {
      const existingItem = cartItems.find((item) => item.productId === product.productId);
      let updatedCart;
      if (existingItem) {
        updatedCart = cartItems.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cartItems, { ...product, quantity: 1 }];
      }
      setCartItems(updatedCart);
      saveLocalCart(updatedCart);
    }
  };

  const removeFromCart = async (productId) => {
    if (isLoggedIn && token) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items);
      } catch (err) {
        console.error(err);
      }
    } else {
      const updatedCart = cartItems.filter((item) => item.productId !== productId);
      setCartItems(updatedCart);
      saveLocalCart(updatedCart);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (isLoggedIn && token) {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/cart/${productId}`,
          { quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems(res.data.items);
      } catch (err) {
        console.error(err);
      }
    } else {
      const updatedCart = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedCart);
      saveLocalCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
