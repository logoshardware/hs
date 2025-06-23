import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import Navbar from "./components/Navbar.js";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Logos Hardware - Next Gen Laptops</title>
        <meta name="description" content="Discover the future of laptops with Logos Hardware." />
      </Head>

      {/* Header */}
      <Navbar/>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-20 px-6">
        <h2 className="text-5xl font-bold text-blue-300 mb-4">Experience the Future of Laptops</h2>
        <p className="text-lg text-gray-300 max-w-2xl">
          High-performance, AI-powered, ultra-thin laptops designed for the next generation of computing.
        </p>
        <Link href="/shop">
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md">
            Shop Now
          </button>
        </Link>
      </main>

      {/* Product Showcase Section */}
      <section className="mt-20 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            name: "Ultra-Thin Performance",
            description: "Sleek design with powerful specs.",
            specs: ["Intel Core i9 12th Gen", "32GB RAM, 1TB SSD", "4K OLED Display"],
            image: "/laptop1.webp",
          },
          {
            name: "Gaming Powerhouse",
            description: "High refresh rate, RGB keyboard, and powerful GPU.",
            specs: ["AMD Ryzen 9 7900X", "64GB RAM, 2TB NVMe SSD", "NVIDIA RTX 4090 16GB", "17.3” 240Hz QHD Display"],
            image: "/laptop2.png",
          },
          {
            name: "Business Elite",
            description: "Lightweight and professional with extended battery life.",
            specs: ["Intel Core i7 13th Gen", "16GB RAM, 512GB SSD", "15.6” Full HD Touchscreen", "18-Hour Battery Life"],
            image: "/laptop3.png",
          },
        ].map((laptop, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <Image src={laptop.image} width={300} height={200} alt={laptop.name} className="rounded w-full object-cover" />
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-blue-300">{laptop.name}</h3>
              <p className="text-gray-400 mt-2">{laptop.description}</p>
              <ul className="text-gray-400 mt-2 text-sm">
                {laptop.specs.map((spec, i) => (
                  <li key={i}>✔ {spec}</li>
                ))}
              </ul>
              <Link href="/shop">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md">
                  Shop Now
                </button>
              </Link>
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
