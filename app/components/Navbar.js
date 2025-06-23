// components/Navbar.js
import Link from "next/link";
import Image from "next/image"; // ✅ Import Image component

const Navbar = () => {
  return (
    <header className="p-6 bg-gray-800 shadow-lg flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image src="/logo.webp" width={50} height={50} alt="Logos Hardware Logo" />
        <h1 className="text-3xl font-bold text-blue-400">Logos Hardware</h1>
      </div>
      <nav>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link href="/" className="hover:text-blue-400 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-blue-400 transition duration-200">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-400 transition duration-200">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/cart" className="hover:text-blue-400 transition duration-200">
            Cart
            </Link>
          </li>

          <li>
          <Link href="/about"  className="hover:text-blue-400 transition duration-200">
          About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
