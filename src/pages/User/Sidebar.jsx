import briefcase from "../../assets/icons/briefcase-01.svg";
import messageChat from "../../assets/icons/message-chat-circle.svg";
import helpCircle from "../../assets/icons/help-circle.svg";
import newPostLogo from "../../assets/icons/newPostLogo.svg";
import Connections from "../../assets/icons/user-logo.svg";

const Sidebar = () => {
  return (
    <div className=" min-w-[300px] mx-20 my-8 h-5/6  rounded-xl shadow-lg overflow-hidden flex flex-col h-screen">
      {/* Profile Info Section */}
      <div className="relative">
        {/* Background Image */}
        <img
          alt="University background"
          className="w-full h-40 object-fill"
          src="https://storage.googleapis.com/a1aa/image/LcbznUrFRYKSAFXkFduaNiGQ8RmxRaCLgYXYhLOulwHEOB8E.jpg"
        />
        {/* University Label */}
        <div className="absolute inset-x-0 top-4 flex justify-center">
          <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-md">
            OP Jindal University
          </div>
        </div>
        {/* Profile Picture */}
        <div className="absolute inset-x-0 top-14 flex justify-center">
          <img
            alt="Profile of Aadarsh Soni"
            className="w-16 h-16 rounded-full border-4 border-white"
            src="https://storage.googleapis.com/a1aa/image/Wgr8fBHQmYQKfUedrtkqTOSNhGW5LZqEXGgyYdbMMLndwJgnA.jpg"
          />
        </div>
        {/* Name and Details */}
        <div className="text-center mt-2">
          <h2 className="text-lg font-semibold">Aadarsh Soni</h2>
          <p className="text-sm text-gray-500">@2022, Btech-CSE-3rd Year</p>
        </div>
        {/* Follower/Following Section */}
        <div className="flex justify-around mt-4 py-2 back  border-gray-300">
          <div className="text-center">
            <span className="block font-semibold text-gray-800">12K</span>
            <span className="text-sm text-gray-500">Follower</span>
          </div>
          <div className="text-center">
            <span className="block font-semibold text-gray-800">13K</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="mt-6 flex-grow px-4">
        <SidebarItem icon={Connections} label="Connections" />
        <SidebarItem icon={newPostLogo} label="Post" />
        <SidebarItem icon={messageChat} label="Chat" />
        <SidebarItem icon={briefcase} label="Applied" />

        {/* Expandable Items */}
        <div className="mt-4">
          <SidebarItem label="Events" expandable />
          <SidebarItem label="Mentorship" />
        </div>
      </nav>

      {/* Footer and Help Section */}
      <div className="px-4 py-2 border-t border-gray-200">
        {/* <SidebarItem label="Help" /> */}
      </div>

      <div className="px-4 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
        <p>Terms and Conditions</p>
        <p>©2024 Network_Next</p>
      </div>
    </div>
  );
};

// Sidebar Item Component with icon and expandable option
const SidebarItem = ({ icon, label, expandable = false }) => (
  <div className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer">
    {icon && <img src={icon} className="text-gray-600 mr-3 w-4" />}
    <span className="flex-grow text-sm font-medium">{label}</span>
    {expandable && (
      <img icon={helpCircle} className="text-gray-400 ml-auto w-4" />
    )}
  </div>
);

export default Sidebar;
