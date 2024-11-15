import { useState } from "react";
import JobCard from "./JobCard"; // Make sure the path is correct based on your file structure

const JobPageContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Alumni", "Facility"];

  // Sample job data (you can replace this with actual data)
  const jobs = [
    {
      title: "Software Engineer Intern",
      company: "DocuVille",
      location: "India",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      postedBy: "Aadarsh",
    },
    {
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Remote",
      description:
        "Exciting opportunity to work as a frontend developer using modern frameworks and technologies.",
      postedBy: "Raj",
    },
    // Add more job objects as needed
  ];

  return (
    <div className="w-1/2 ">
      {/* Tab Navigation */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4">
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

      {/* Job Cards */}
      <div className="flex flex-wrap  gap-4">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            postedBy={job.postedBy}
          />
        ))}
      </div>
    </div>
  );
};

export default JobPageContent;
