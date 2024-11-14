import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import UserCard from "./UserCard";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "lucide-react";

const ConnectionContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Existing Faculty", "Alma Connection", "Student"];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset the search when changing tabs if needed
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-1/2">
      {/* Tab Navigation */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`text-sm px-4 py-2 rounded-full font-semibold ${
              activeTab === tab ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex mx-8 mt-6 items-center justify-between px-4 py-2 bg-white ">
        <div className="flex gap-4 items-center ">
          <Link to={"/dashboard"}>
            <button className="h-6 w-6">
              <FaArrowLeft />
            </button>
          </Link>
          <h2 className="text-xl font-bold">750 Connections</h2>
        </div>
        <div className="flex w-1/3 items-center rounded-md border border-gray-700 mx-12 px-3 py-1 bg-white">
          <CiSearch />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full text-sm py-1 px-2 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Connections List */}
      <div className="w-full bg-white p-4 h-[calc(100vh-260px)] overflow-y-auto hide-scrollbar">
        {/* Filtered User Cards based on Search and Active Tab */}
        {[...Array(10)].map((_, index) => (
          <UserCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ConnectionContent;
