import Image from "next/image";
import Link from "next/link";

const laptops = [
  { id: 1, name: "Logos Sun", price: "$1,599", image: "/images/laptop-a.webp", category: "gaming", description: "A powerful gaming laptop." },
  { id: 2, name: "Logos Bright", price: "$1,799", image: "/images/laptop-b.webp", category: "business", description: "Premium ultrabook." },
  { id: 3, name: "Logos Vinted", price: "$2,499", image: "/images/macbook-pro-16.jpg", category: "creative", description: "Apple’s high-end laptop." },
  { id: 4, name: "Logos Sharp", price: "$2,199", image: "/images/razer-blade-15.jpg", category: "gaming", description: "Thin and powerful gaming laptop." },
  { id: 5, name: "Logos Sen", price: "$1,599", image: "/images/hp-spectre-x360.jpg", category: "business", description: "Versatile 2-in-1 laptop." },
  { id: 6, name: "Logos Mighty", price: "$1,399", image: "/images/acer-predator-helios-300.jpg", category: "gaming", description: "Affordable gaming laptop." },
  { id: 7, name: "Logos Chillout", price: "$1,999", image: "/images/lenovo-thinkpad-x1.jpg", category: "business", description: "Ultra-light business laptop." },
  { id: 8, name: "Logos Strech", price: "$1,299", image: "/images/microsoft-surface-laptop-5.jpg", category: "business", description: "Stylish and portable ultrabook." },
  { id: 9, name: "Logos Gigabyte", price: "$2,099", image: "/images/gigabyte-aero-16.jpg", category: "creative", description: "Powerful creative laptop." },
  { id: 10, name: "Logos Waterfall", price: "$1,899", image: "/images/asus-zenbook-duo-14.jpg", category: "creative", description: "Innovative dual-screen laptop." },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const laptopId = parseInt(params.id);
  const laptop = laptops.find((l) => l.id === laptopId);

  if (!laptop) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-red-600">Laptop Not Found</h1>
        <Link href="/shop" className="text-blue-500 underline mt-4">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <Link href="/shop" className="text-blue-600 hover:underline">← Back to Shop</Link>

      <div className="flex flex-col md:flex-row mt-6 gap-10">
        <div className="w-full md:w-1/2">
          <Image src={laptop.image} alt={laptop.name} width={600} height={400} className="rounded-lg shadow-lg" />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900">{laptop.name}</h1>
          <p className="text-xl text-gray-700 mt-2">{laptop.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mt-4">{laptop.price}</p>

          <p className="mt-6">
            <strong>Category:</strong> 
            <span className="ml-2 px-3 py-1 bg-gray-200 rounded-full text-sm">{laptop.category}</span>
          </p>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
