"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Laptop interface (shared)
export interface Laptop {
  id: number;
  name: string;
  price: number | string; // accept string or number to match usage
  image: string;
  description: string;
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
    gpu?: string;
    os?: string;
  };
}

// Cart item extends Laptop by adding quantity
export interface CartItem extends Laptop {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === newItem.id);
      if (existing) {
        // Increase quantity but don't exceed availableQuantity
        return prevCart.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + newItem.quantity,
                  item.availableQuantity
                ),
              }
            : item
        );
      }
      // Add new item
      return [...prevCart, newItem];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const priceNumber =
        typeof item.price === "string"
          ? Number(item.price.replace(/[$,]/g, ""))
          : item.price;
      return total + priceNumber * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, getTotalItems, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
