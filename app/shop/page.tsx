"use client"; // Make sure this is a client-side component

import React from 'react';
import Image from 'next/image';
import { useCart } from './../context/CartContext';  
import Link from "next/link";  // Link to navigate between pages
import { laptopsData } from "../../data/laptopsData.tsx"; // Your product data
import Navbar from "./../components/Navbar.js";
export default function ShopPage() {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <Navbar/>
      {/* Shop Section */}
      <section className="mt-20 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {laptopsData.map((product, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
            {/* Link to Product Details Page */}
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            </Link>
            <h3 className="text-xl font-semibold text-blue-300">
              {/* Link to Product Details Page */}
              <Link href={`/product/${product.id}`} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="text-gray-400 mt-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-500">{product.price}</span>
              <a href={`/product/${product.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">     
                Product Details
              </button>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-20 p-6 bg-gray-800 text-center text-gray-400">
        © 2025 Logos Hardware. All Rights Reserved.
      </footer>
    </div>
  );
}
