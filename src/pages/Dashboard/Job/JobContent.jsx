import { useState } from "react";
import JobCard from "./JobCard";

const JobContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Alumni", "Faculty"];

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="flex justify-around border border-gray-300 bg-white rounded-lg shadow-md p-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === tab
                ? "text-black font-bold bg-gray-200"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable Job Cards Section */}
      <div className="flex space-x-4  p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <JobCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default JobContent;
