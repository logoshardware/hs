import Link from "next/link";
import Image from "next/image";
interface Laptop {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Props {
  laptop: Laptop;
}
export default function LaptopCard({ laptop }: Props) {
  return (
    
    <div className="border p-4 rounded-lg shadow-md">
      <Link href={`/shop/${laptop.id}`}>
        <Image src={laptop.imageUrl} alt={laptop.name} width=
        {300} height={200} className="rounded-lg" />
      </Link>
      <h2 className="text-xl font-bold mt-3">{laptop.name}</h2>
      <p className="text-gray-700">{laptop.price}</p>
      <Link href={`/shop/${laptop.id}`} className="block mt-4 text-blue-600 hover:underline">
        View Details →
      </Link>
    </div>
  );
}
