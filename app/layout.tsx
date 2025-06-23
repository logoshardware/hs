"use client";
import { CartProvider } from "./context/CartContext";
import './globals.css'; // Or adjust the path if using a different directory

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </CartProvider>
  );
}
