"use client";
import { createContext, useContext, useState } from "react";

// Create a context with a default value of null
const CartContext = createContext(null);

// CartProvider component that provides the cart state
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to access the cart context
export function useCart() {
  const context = useContext(CartContext);
  
  // If context is not available (useCart is used outside of CartProvider)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
