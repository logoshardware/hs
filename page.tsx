import Image from "next/image";
import Link from "next/link";

const laptops = [/* ...twój array... */];

export async function generateStaticParams() {
  return laptops.map((laptop) => ({
    id: laptop.id.toString(),
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
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
