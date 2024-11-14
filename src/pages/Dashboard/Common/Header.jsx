import { Link, useLocation } from "react-router-dom";
import NsquareLogo from "../../../assets/icons/logo nsqaure 1.svg";
import notification from "../../../assets/icons/notification-icon.svg";
import search from "../../../assets/icons/search-icon.svg";
import setting from "../../../assets/icons/setting-icon.svg";

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/dashboard/home" },
    { name: "Job", path: "/dashboard/job" },
    { name: "Event", path: "/dashboard/events" },
    { name: "Project", path: "/dashboard/project" },
    { name: "Inspiring Story", path: "/dashboard/inspiring-story" },
  ];

  return (
    <header className="w-full h-16 flex items-center justify-between mt-2 px-6 py-4 bg-white border-b shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={NsquareLogo} alt="Nsquare Logo" className="w-10 h-10" />
      </div>

      {/* Navigation Section */}
      <nav className="flex space-x-[97px]">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-xl font-semibold ${
              location.pathname === link.path ? "text-black" : "text-gray-800"
            } hover:text-black`}
            aria-label={`Navigate to ${link.name}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Icon Section */}
      <div className="flex items-center space-x-[10px]">
        <button aria-label="Search">
          <img
            src={search}
            alt="Search Icon"
            className="h-12 w-12 hover:opacity-80"
          />
        </button>
        <button aria-label="Notifications">
          <img
            src={notification}
            alt="Notifications Icon"
            className="h-12 w-12 hover:opacity-80"
          />
        </button>
        <button aria-label="Settings">
          <img
            src={setting}
            alt="Settings Icon"
            className="h-12 w-12 hover:opacity-80"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
