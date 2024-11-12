import NsquareLogo from "../../assets/icons/logo nsqaure 1.svg";
import notification from "../../assets/icons/notification-icon.svg";
import search from "../../assets/icons/search-icon.svg";
import setting from "../../assets/icons/setting-icon.svg";

const Header = () => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src={NsquareLogo} // Replace with your actual logo URL
          alt="Logo"
          className="w-10 h-10"
        />
      </div>

      {/* Navigation Section */}
      <nav className="flex space-x-[97px]">
        <a
          href="#home"
          className="text-gray-800 text-xl font-semibold hover:text-black"
        >
          Home
        </a>
        <a
          href="#job"
          className="text-gray-800 text-xl font-semibold hover:text-black"
        >
          Job
        </a>
        <a
          href="#event"
          className="text-gray-800 text-xl font-semibold hover:text-black"
        >
          Event
        </a>
        <a
          href="#projects"
          className="text-gray-800 text-xl font-semibold hover:text-black"
        >
          Projects
        </a>
        <a
          href="#inspiring-story"
          className="text-gray-800 text-xl font-semibold hover:text-black"
        >
          Inspiring Story
        </a>
      </nav>

      {/* Icon Section */}
      {/* Custom Icon Buttons Section */}
      <div className="flex items-center space-x-[10px]">
        <button className="" aria-label="Search">
          <img
            src={search} // Replace with your search icon URL
            alt="Search Icon"
            className="h-12 w-12"
          />
        </button>
        <button className="" aria-label="Notifications">
          <img
            src={notification} // Replace with your notification icon URL
            alt="Notifications Icon"
            className="h-12 w-12"
          />
        </button>
        <button className="" aria-label="Settings">
          <img
            src={setting} // Replace with your settings icon URL
            alt="Settings Icon"
            className="h-12 w-12"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
