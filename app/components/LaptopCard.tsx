import Image from "next/image";

interface Laptop {
  id: number;
  name: string;
  price: number;
  imageUrl: string;

  description: string;
  specs: string;
  availableQuantity: number;
  rating: number;
  releaseYear: number;
  category: string[];
  features: string[];
  colorOptions: string[];
}

interface Props {
  laptop: Laptop;
}

const LaptopCard = ({ laptop }: Props) => {
  return (
    <div className="laptop-card">
      <Image
        src={laptop.imageUrl}
        alt={laptop.name}
        width={300}
        height={200}
        className="laptop-image"
      />
      <h3>{laptop.name}</h3>
      <p><strong>Price:</strong> {laptop.price}</p>
      <p><strong>Description:</strong> {laptop.description}</p>
      <p><strong>Specs:</strong> {laptop.specs}</p>
      <p><strong>Available:</strong> {laptop.availableQuantity}</p>
      <p><strong>Rating:</strong> {laptop.rating}</p>
      <p><strong>Release Year:</strong> {laptop.releaseYear}</p>
      <p><strong>Category:</strong> {laptop.category.join(', ')}</p>
      <p><strong>Features:</strong> {laptop.features.join(', ')}</p>
      <p><strong>Color Options:</strong> {laptop.colorOptions.join(', ')}</p>
    </div>
  );
};

export default LaptopCard;
