import { Link } from "react-router-dom";
import NsquareLogo from "../../assets/icons/nsqure.svg"; // Replace with the actual logo path
import NetworkNext from "../../assets/icons/Network Next.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center">
      <img src={NsquareLogo} alt="Network Next " className="w-15 h-15 " />
        <img src={NetworkNext} alt="Network Next " className="px-4 w-15 h-15 " />
        
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-10 space-x-5">
        <a
          href="#home"
          className=" font-semibold text-gray-600 hover:text-black transition"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-gray-600 font-semibold hover:text-black transition"
        >
          About
        </a>
        <a
          href="#solutions"
          className="text-gray-600 font-semibold hover:text-black transition"
        >
          Solutions
        </a>
        <a
          href="#story"
          className="text-gray-600 font-semibold hover:text-black transition"
        >
          Story
        </a>
      </nav>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
            to="/login">
        <button className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800">
          Log IN
        </button></Link>
        <Link
            to="/signup">
        <button className="px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800">
          Sign UP
        </button></Link>
      </div>
    </header>
  );
};

export default Header;
