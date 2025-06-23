"use client"
import React from "react";// Explicitly import React for TypeScript
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <title>About Us - Logos Hardware</title>
        <meta name="description" content="Learn more about Logos Hardware and our commitment to innovation." />
        <Navbar/>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">About Logos Hardware</h1>

        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12">
          <Image
            src="/images/laptop-design.webp"
            width={500}
            height={300}
            alt="Laptops Display"
            className="rounded-lg shadow-lg mb-6 md:mb-0"
          />

          <div className="max-w-2xl">
            <p className="text-lg text-gray-300 leading-relaxed">
              At <span className="text-blue-400 font-semibold">Logos Hardware</span>, we believe in pushing the boundaries of technology to deliver the most innovative and high-performance laptops.
              Our mission is to revolutionize computing experiences by integrating cutting-edge AI, ultra-fast processors, and premium designs into every product we offer.
            </p>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Whether you're a professional, gamer, or student, we provide laptops that cater to every need. Quality, performance, and reliability are at the core of what we do.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-blue-300">Innovation & AI</h2>
            <p className="text-gray-400 mt-2">We integrate the latest AI technologies to enhance efficiency and performance.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-blue-300">Sustainable Technology</h2>
            <p className="text-gray-400 mt-2">Committed to eco-friendly materials and energy-efficient designs.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-blue-300">Customer Satisfaction</h2>
            <p className="text-gray-400 mt-2">Your satisfaction is our priority, with 24/7 support and global warranty.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-blue-300">Join Us on Our Journey</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            Be a part of the next-generation laptop revolution. Experience high performance and cutting-edge technology today.
          </p>
          <link href="/shop/" className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
            Explore Our Laptops
          </link>
        </div>
      </div>
      
      <footer className="mt-12 p-6 bg-gray-800 text-center text-gray-400">
        © 2025 Logos Hardware. All Rights Reserved.
      </footer>
    </div>
  );
}
