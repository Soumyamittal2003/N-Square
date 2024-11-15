import briefcase from "../../../assets/icons/briefcase-01.svg";
import messageChat from "../../../assets/icons/message-chat-circle.svg";
import helpCircle from "../../../assets/icons/help-circle.svg";
import newPostLogo from "../../../assets/icons/newPostLogo.svg";
import Connections from "../../../assets/icons/user-logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const Sidebar = () => {
  return (
    <div className="min-w-[300px] mx-16 mt-2 h-[calc(100vh-100px)] rounded-xl shadow-lg overflow-hidden flex flex-col">
      {/* Profile Info Section */}
      <ProfileSection />
      {/* Navigation Items */}
      <nav className="mt-6 flex-grow px-4">
        <Link to="/dashboard/connection">
          <SidebarItem icon={Connections} label="Connection" />
        </Link>
        <Link to="/dashboard/post">
          <SidebarItem icon={newPostLogo} label="Post" />
        </Link>
        <Link to="/dashboard/chat">
          <SidebarItem icon={messageChat} label="Chat" />
        </Link>
        <Link to="/dashboard/applied">
          <SidebarItem icon={briefcase} label="Applied" />
        </Link>
        <hr className="border-gray-200 my-2" />
        {/* Expandable Items */}
        <ExpandableItems />
        {/* Divider and Help Section */}
        <hr className="border-gray-200 my-2" />
        <Link to="/dashboard/help">
          <SidebarItem icon={helpCircle} label="Help" />
        </Link>
      </nav>

      <Footer />
    </div>
  );
};

// Profile Section Component
const ProfileSection = () => (
  <div className="relative">
    <img
      alt="University background"
      className="w-full h-60 object-fill"
      src="https://storage.googleapis.com/a1aa/image/LcbznUrFRYKSAFXkFduaNiGQ8RmxRaCLgYXYhLOulwHEOB8E.jpg"
    />
    <div className="absolute inset-x-0 top-4 flex justify-center">
      <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-md">
        OP Jindal University
      </div>
    </div>
    <div className="absolute inset-x-0 top-14 flex justify-center">
      <img
        alt="Profile of Aadarsh Soni"
        className="w-16 h-16 rounded-full border-4 border-white"
        src="https://storage.googleapis.com/a1aa/image/Wgr8fBHQmYQKfUedrtkqTOSNhGW5LZqEXGgyYdbMMLndwJgnA.jpg"
      />
    </div>
    <div className="absolute insert-x-0 top-32 w-full justify-center text-white text-center  mt-2">
      <div>
        <h2 className="text-lg font-semibold">Aadarsh Soni</h2>
        <p className="text-sm ">@2022, Btech-CSE-3rd Year</p>
      </div>
    </div>
    <div className=" relative flex justify-around rounded-full py-2 border">
      <div className="text-center border-r w-1/2">
        <span className="block font-semibold text-gray-800">12K</span>
        <span className="text-sm text-gray-500">Follower</span>
      </div>
      <div className="text-center w-1/2">
        <span className="block font-semibold text-gray-800">13K</span>
        <span className="text-sm text-gray-500">Following</span>
      </div>
    </div>
  </div>
);

// Sidebar Item Component with icon and expandable option
const SidebarItem = ({ icon, label, expandable = false }) => (
  <div className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer">
    {icon && (
      <img
        src={icon}
        alt={`${label} icon`}
        className="text-gray-600 mr-3 w-4"
      />
    )}
    <span className="flex-grow text-sm font-medium">{label}</span>
    {expandable && (
      <img
        src={newPostLogo}
        alt="expand icon"
        className="text-gray-400 ml-auto w-4"
      />
    )}
  </div>
);

// Expandable Items Component
const ExpandableItems = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div onClick={() => setExpanded(!expanded)}>
        <SidebarItem label="Events" expandable />
      </div>
      {expanded && (
        <div className="ml-6 mt-2 space-y-2">
          <Link to="/dashboard/event/event1">
            <SidebarItem label="Event 1" />
          </Link>
          <Link to="/dashboard/event/event2">
            <SidebarItem label="Event 2" />
          </Link>
          <Link to="/dashboard/event/event3">
            <SidebarItem label="Event 3" />
          </Link>
        </div>
      )}
      <Link to="/dashboard/mentorship">
        <SidebarItem label="Mentorship" />
      </Link>
    </>
  );
};

// Footer Component
const Footer = () => (
  <div className="px-4 py-4 text-center text-xs text-gray-500 border-t border-gray-300">
    <p>Terms and Conditions</p>
    <p>©2024 Network_Next</p>
  </div>
);

export default Sidebar;
