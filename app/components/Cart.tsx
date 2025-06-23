// /app/cart/page.tsx
"use client";
import React from "react";
import { useCart } from "../store/useCart"; // Adjust path if needed
import Navbar from "../components/Navbar"; // Path adjusted
import Link from "next/link"; // Added for navigation

// Define CartItem type (consistent with your previous useCart store)
interface CartItem {
  id: number;
  name: string;
  price: string; // e.g., "$99.99"
  description: string;
  image: string;
  release: number;
  availableQuantity: number;
  rating: number;
  category: string;
  specifications: {
    cpu: string;
    ram: string;
    storage: string;
    screen: string;
    battery: string;
    weight: string;
  };
  quantity: number;
}

// Define the expected shape of useCart store
interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Type the component
const Cart: React.FC = () => {
  const {
    cart = [], // Default to empty array to avoid undefined errors
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart() as CartStore; // Type assertion

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id); // Remove item if quantity drops below 1
    } else {
      updateQuantity(id, newQuantity); // Update quantity
    }
  };

  // Calculate total price manually for verification (optional)
  // const calculateTotalPrice = () => {
  //   return cart.reduce(
  //     (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity,
  //     0
  //   ).toFixed(2);
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-blue-300">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => {
 
              const itemPrice = item.price.replace("$","");// If this fails, totalItemPrice is NaN
              const totalItemPrice = itemPrice.replace("$", "").replace(",","") * item.quantity;      
              return (  
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-700 py-2"
                >
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      {item.price} x {item.quantity} = ${totalItemPrice}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="bg-gray-700 text-white px-2 py-1 rounded disabled:opacity-50 hover:bg-gray-600"
                    >
                      ➖
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      ➕
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              );
            })}
            {/* Total Summary */}
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-300">
                Total Items: {getTotalItems()} | Total: ${getTotalPrice().toFixed(2)}
              </p>
              {/* Optional: Manual calculation for debugging */}
              {/* <p className="text-sm text-gray-400">Manual Total: ${calculateTotalPrice()}</p> */}
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600 transition disabled:opacity-50"
                disabled={cart.length === 0}
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="bg-green-500 text-white p-2 rounded w-full text-center hover:bg-green-600 transition disabled:opacity-50"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;