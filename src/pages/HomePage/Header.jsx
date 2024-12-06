import { Link } from "react-router-dom";
import NsquareLogo from "../../assets/icons/nsqure.svg"; // Replace with the actual logo path
import NetworkNext from "../../assets/icons/Network Next.svg";

const Header = () => {
  // Smooth scroll handler
  const handleScroll = (e, targetId) => {
    e.preventDefault(); // Prevent default anchor behavior
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 border-b border-gray-200 shadow-lg bg-white z-50">
      {/* Logo Section */}
        <div className="flex items-center">
          <img src={NsquareLogo} alt="Nsquare Logo" className="w-15 h-15" />
          <img src={NetworkNext} alt="Network Next" className="px-4 w-15 h-15" />
        </div>
     

      {/* Navigation Links */}
      <nav className="items-center flex gap-20 space-x-5">
        <a
          href="#home"
          onClick={(e) => handleScroll(e, "/Home")}
          className="font-semibold text-gray-600 hover:text-black transition"
        >
          Home
        </a>
        <a
          href="#about"
          onClick={(e) => handleScroll(e, "about")}
          className="text-gray-600 font-semibold hover:text-black transition"
        >
          About
        </a>
        <a
          href="#solutions"
          onClick={(e) => handleScroll(e, "solutions")}
          className="text-gray-600 font-semibold hover:text-black transition"
        >
          Solutions
        </a>
        <a
          href="#story"
          onClick={(e) => handleScroll(e, "story")}
          className="text-gray-600 font-semibold hover:text-black transition"
        >
          Story
        </a>
      </nav>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800">
            Log IN
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800">
            Sign UP
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
