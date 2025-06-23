"use client"

import { useCart } from "../context/CartContext";

export default function CartSummary() {
  const { cart } = useCart();

  if (!cart) {
    return <p>Loading cart...</p>; // Prevents crashing when cart is undefined
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - {item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
