import briefcase from "../../../assets/icons/briefcase-01.svg";
import messageChat from "../../../assets/icons/message-chat-circle.svg";
import helpCircle from "../../../assets/icons/help-circle.svg";
import newPostLogo from "../../../assets/icons/newPostLogo.svg";
import Connections from "../../../assets/icons/user-logo.svg";
import videoChatIcon from "../../../assets/icons/video-chat-icon.svg";
import { Link } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import { useState, useEffect } from "react";
import PostPopup from "./Postpage.jsx";
import axiosInstance from "../../../utils/axiosinstance";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = Cookies.get("id");
        const response = await axiosInstance.get(`/users/${id}`);
        setUserData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="mx-4 mt-4 h-[calc(100vh-100px)] rounded-xl shadow-lg border border-gray-300 overflow-hidden flex flex-col max-h-full">
      {/* Profile Section */}
      <Link to="/dashboard/profile">
        <ProfileSection userData={userData} />
      </Link>

      {/* Followers and Following Section */}
      <div className="flex items-center justify-around p-1 border border-gray-300 rounded-2xl shadow-sm mx-4 py-1">
        <Link to="/dashboard/followers" className="text-center">
          <div>
            <span className="block text-lg font-semibold text-gray-800">
              {userData.followers.length}
            </span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
        </Link>
        <div className="border-l border-gray-300 h-8"></div>
        <Link to="/dashboard/following" className="text-center">
          <div>
            <span className="block text-lg font-semibold text-gray-800">
              {userData.following.length}
            </span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow flex flex-col overflow-auto hide-scrollbar">
        <nav className="px-4 py-4">
          <Link to="/dashboard/connection" className="mt-3">
            <SidebarItem icon={Connections} label="Connections" />
          </Link>
          <div onClick={togglePopup} className="py-1">
            <SidebarItem icon={newPostLogo} label="Post" />
          </div>
          <Link to="/dashboard/chat" className="py-1">
            <SidebarItem icon={messageChat} label="Chat" />
          </Link>
          <Link to="/dashboard/video-call" className="py-1">
            <SidebarItem icon={videoChatIcon} label="Video Call" />
          </Link>
          <Link to="/dashboard/job-internship-applied" className="py-4">
            <SidebarItem icon={briefcase} label="Job/Internship Applied" />
          </Link>
          <hr className="border-gray-300 py-1 mt-2" />
          <Link to="/dashboard/my-events" className="py-1">
            <SidebarItem label="My Events" />
          </Link>
          <Link to="/dashboard/mentorship" className="py-1">
            <SidebarItem label="Mentorship" />
          </Link>
          <hr className="border-gray-300 py-1 mt-2" />
          <Link to="/dashboard/help">
            <SidebarItem icon={helpCircle} label="Help" />
          </Link>
        </nav>
        
        {/* Virtual Interview Button */}
        <Link
          to="https://n-sqare-virtual-interview.vercel.app/"
          className="mx-3 mt-2"
        >
          <button className="w-full py-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-center hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-blue-400/50 hover:shadow-purple-400/20">
            Virtual Interview
          </button>
        </Link>

        {/* Footer */}
        <Footer />
      </div>

      {/* Post Popup */}
      {isPopupOpen && <PostPopup setPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center p-1 text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer">
    {icon && <img src={icon} alt={`${label} icon`} className="w-5 h-5 mr-3" />}
    <span className="flex-grow text-sm font-medium">{label}</span>
  </div>
);

// Footer Component
const Footer = () => (
  <div className="text-center text-xs text-gray-500 mt-auto p-3">
    <p>Terms and Conditions</p>
    <p>©2024 Network_Next</p>
  </div>
);

export default Sidebar;
