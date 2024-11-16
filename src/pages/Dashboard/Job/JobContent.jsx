import { useState } from 'react';
import JobCard from './JobCard';

const JobContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Alumni", "Faculty"];

  return (
    <div className="w-90%">
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-full font-semibold ${
              activeTab === tab ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable Job Cards Section */}
      <div className="flex space-x-10  p-4">
        {Array.from({ length: 3}).map((_, index) => (
          <JobCard key={index} />
        ))}
      </div>
      <div className="flex space-x-10  p-4">
        {Array.from({ length: 3}).map((_, index) => (
          <JobCard key={index} />
        ))}
      </div>
      
    </div>
  );
};

export default JobContent;