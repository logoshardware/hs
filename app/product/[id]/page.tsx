// /app/product/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "../../store/useCart"; // Adjust path if needed
import { laptopsData } from "../../../data/laptopsData";
import Navbar from "../../components/Navbar";
import Link from "next/link";
// Comprehensive Laptop interface with all features
interface Laptop {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  release: number; // e.g., release year
  availableQuantity: number; // Stock availability
  rating: number; // e.g., 4.5 out of 5
  category: string; // e.g., "Gaming", "Ultrabook"
  specifications: {
    cpu: string;
    ram: string;
    storage: string;
    screen: string;
    battery: string;
    weight: string;
    gpu?: string; // Optional GPU for graphics-heavy laptops
    os?: string; // Operating system
  };
}

const typedLaptopsData: Laptop[] = laptopsData;

export default function ProductDetailsPage() {
  const { addToCart, cart, getTotalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [product, setProduct] = useState<Laptop | null>(null);

  useEffect(() => {
    if (!pathname) return;
    const id = pathname.split("/")[2];
    const foundProduct = typedLaptopsData.find((item) => item.id === parseInt(id));
    setProduct(foundProduct || null);
  }, [pathname]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.availableQuantity === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      alert("Sorry, this product is out of stock.");
      return;
    }
    addToCart(product);
    console.log("Items in cart:", getTotalItems());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <section className="mt-20 px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-800 p-6 rounded-lg shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between p-6 bg-gray-800 rounded-lg shadow-xl">
            <div>
              <h3 className="text-3xl font-semibold text-blue-300 mb-2">{product.name}</h3>
              <p className="text-gray-400 text-lg mb-4">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">{"★".repeat(Math.floor(product.rating))}</span>
                <span className="text-gray-500">
                  {"★".repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="ml-2 text-gray-400">({product.rating}/5)</span>
              </div>

              {/* Category and Release */}
              <p className="text-gray-400 mb-2">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-gray-400 mb-4">
                <span className="font-semibold">Released:</span> {product.release}
              </p>

              {/* Specifications */}
              <div className="mb-6">
                <h4 className="text-xl text-blue-500 font-semibold mb-2">Specifications</h4>
                <ul className="list-disc pl-6 text-gray-400 space-y-1">
                  <li><strong>CPU:</strong> {product.specifications.cpu}</li>
                  <li><strong>RAM:</strong> {product.specifications.ram}</li>
                  <li><strong>Storage:</strong> {product.specifications.storage}</li>
                  <li><strong>Screen:</strong> {product.specifications.screen}</li>
                  <li><strong>Battery:</strong> {product.specifications.battery}</li>
                  <li><strong>Weight:</strong> {product.specifications.weight}</li>
                  {product.specifications.gpu && (
                    <li><strong>GPU:</strong> {product.specifications.gpu}</li>
                  )}
                  {product.specifications.os && (
                    <li><strong>OS:</strong> {product.specifications.os}</li>
                  )}
                </ul>
              </div>

              {/* Stock Status */}
              <p className="text-gray-400 mb-4">
                <span className="font-semibold">Availability:</span>{" "}
                {isOutOfStock ? (
                  <span className="text-red-500">Out of Stock</span>
                ) : (
                  <span className="text-blue-500">{product.availableQuantity} in stock</span>
                )}
              </p>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-500">{product.price}</span>
              <Link href={`/cart`}>
                <button style={{ "backgroundColor": "rgba(21, 128, 61, 0.85)", "borderRadius":"5px"}} className={"bg-blue-500 text-white hover:bg-blue-600 p-2.5 color-green-50 radius-5 rounded-sm"} > View Cart </button>
            </Link>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition duration-200 ${
                  isOutOfStock
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
              
            </div>

            {/* Cart Status */}
            <p className="mt-4 text-gray-400">
              Cart Items: {getTotalItems()} | In Cart: {quantityInCart}
            </p>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-xl">
          <h4 className="text-xl text-blue-500 font-semibold mb-4">Additional Information</h4>
          <p className="text-gray-400">
            This {product.category.toLowerCase()} laptop from {product.release} offers top-tier
            performance with its {product.specifications.cpu} processor and{" "}
            {product.specifications.ram} of RAM. Ideal for{" "}
            {product.category === "Gaming" ? "gaming and streaming" : "productivity and multitasking"}.
            {product.specifications.gpu &&
              ` It also features a ${product.specifications.gpu} for enhanced graphics.`}
          </p>
        </div>
      </section>

      <footer className="mt-20 p-6 bg-gray-800 text-center text-gray-400">
        © 2025 Logos Hardware. All Rights Reserved.
      </footer>
    </div>
  );
}