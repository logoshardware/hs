// /app/checkout/page.tsx
"use client";
import React, { useState } from "react";
import { useCart } from "../store/useCart";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  expiry: string;
  paymentMethod: "card" | "cod";
}

export default function CheckoutPage() {
  const { cart = [], getTotalPrice, clearCart } = useCart(); // Added clearCart
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    expiry: "",
    paymentMethod: "card",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate expiry date format (MM/YY) for card payments
  const isValidExpiry = (expiry: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiry)) return false;

    const [month, year] = expiry.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Common billing validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zip ||
      !formData.country
    ) {
      setError("Please fill out all billing fields.");
      return;
    }

    // Card-specific validation
    if (formData.paymentMethod === "card") {
      if (!formData.expiry || !isValidExpiry(formData.expiry)) {
        setError("Please enter a valid expiry date in MM/YY format (e.g., 12/24).");
        return;
      }
    }

    // If validation passes, proceed with checkout
    setError("");
    alert(
      `✅ Order placed successfully! Payment method: ${
        formData.paymentMethod === "card" ? "Card" : "Cash on Delivery"
      }`
    );
    clearCart(); // Clear the cart after successful checkout
    router.push("/"); // Redirect to home page
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout 🛒</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>
                  ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-lg font-bold mt-4">
          Total: ${getTotalPrice().toFixed(2)}
        </p>
      </div>
      <form onSubmit={handleCheckout} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          />
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
          >
            <option value="card">Credit Card</option>
            <option value="cod">Za pobraniem (Cash on Delivery)</option>
          </select>
          {formData.paymentMethod === "card" && (
            <input
              type="text"
              name="expiry"
              placeholder="Card Expiry (MM/YY)"
              value={formData.expiry}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:ring focus:ring-blue-300"
              maxLength={5}
            />
          )}
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}