// Sidebar.jsx
import briefcase from "../../../assets/icons/briefcase-01.svg";
import messageChat from "../../../assets/icons/message-chat-circle.svg";
import helpCircle from "../../../assets/icons/help-circle.svg";
import newPostLogo from "../../../assets/icons/newPostLogo.svg";
import Connections from "../../../assets/icons/user-logo.svg";
import { Link } from "react-router-dom"; // Import Link
import ProfileSection from "./ProfileSection"; // Import the ProfileSection component
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosinstance";
const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axiosInstance.get(`/users/${id}`);
        setUserData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="relative">
        <p className="text-center py-6 text-gray-500">Loading profile</p>
      </div>
    );
  }
  return (
    <div className="min-w-[275px] mx-12 mt-4 h-[calc(100vh-100px)] rounded-xl shadow-lg overflow-hidden flex flex-col">
      {/* Profile Info Section */}
      <Link to={"/dashboard/profile"}>
        <ProfileSection userData={userData} />
      </Link>
      {/* Navigation Items */}
      <div className="relative flex items-center justify-center h-10 rounded-full py-2 mx-4 border">
        <Link to={"/dashboard/followers"} className="flex-1 text-center">
          <div>
            <span className="block font-semibold text-gray-800">
              {userData.followers.length}
            </span>
            <span className="text-sm text-gray-500">Follower</span>
          </div>
        </Link>

        {/* Vertical Divider */}
        <div className="border-l border-gray-300 h-8 mx-2"></div>

        <Link to={"/dashboard/following"} className="flex-1 text-center">
          <div>
            <span className="block font-semibold text-gray-800">
              {userData.following.length}
            </span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </Link>
      </div>
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
