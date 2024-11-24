import briefcase from "../../../assets/icons/briefcase-01.svg";
import messageChat from "../../../assets/icons/message-chat-circle.svg";
import helpCircle from "../../../assets/icons/help-circle.svg";
import newPostLogo from "../../../assets/icons/newPostLogo.svg";
import Connections from "../../../assets/icons/user-logo.svg";
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
    <div className=" mx-4 mt-4 h-[calc(100vh-100px)] rounded-xl shadow-lg overflow-hidden flex flex-col">
      {/* Profile Section */}
      <Link to="/dashboard/profile">
        <ProfileSection userData={userData} />
      </Link>

      {/* Followers and Following Section */}
      <div className="flex items-center justify-around p-1 border rounded-2xl mx-4">
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
      <div className="flex-grow flex flex-col ">
        <nav className=" mt-4 px-4 space-y-2">
          <Link to="/dashboard/connection">
            <SidebarItem icon={Connections} label="Connection" />
          </Link>
          <div onClick={togglePopup}>
            <SidebarItem icon={newPostLogo} label="Post" />
          </div>
          <Link to="/dashboard/chat">
            <SidebarItem icon={messageChat} label="Chat" />
          </Link>
          <Link to="/dashboard/applied">
            <SidebarItem icon={briefcase} label="Applied" />
          </Link>
          <hr className="border-gray-100" />
          <ExpandableItems />
          <hr className="border-gray-100" />
          <Link to="/dashboard/help">
            <SidebarItem icon={helpCircle} label="Help" />
          </Link>
        </nav>
        <Footer />
      </div>

      {/* Post Popup */}
      {isPopupOpen && <PostPopup setPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, expandable = false }) => (
  <div className="flex items-center p-1 text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer">
    {icon && <img src={icon} alt={`${label} icon`} className="w-5 h-5 mr-3" />}
    <span className="flex-grow text-sm font-medium">{label}</span>
    {expandable && (
      <img src={newPostLogo} alt="expand icon" className="w-4 ml-auto" />
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
        <div className="ml-6 space-y-2">
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
      <Link to="https://n-sqare-virtual-interview.vercel.app/">
        <SidebarItem label="Virtual Interview" />
      </Link>
    </>
  );
};

// Footer Component
const Footer = () => (
  <div className="text-center text-xs text-gray-500 mt-6 p-3 ">
    <p>Terms and Conditions</p>
    <p>©2024 Network_Next</p>
  </div>
);

export default Sidebar;
