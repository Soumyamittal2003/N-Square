import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import axiosInstance from "../../../utils/axiosinstance"; // Adjust the path to your axios instance

const JobContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ["All", "Alumni", "Faculty"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before fetching
        const response = await axiosInstance.get("/jobs/all");
        if (response.data.success) {
          setJobs(response.data.jobs || []);
        } else {
          setError("Failed to fetch jobs. Please try again later.");
        }
      } catch (err) {
        setError("Failed to fetch jobs. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "All") return true;
    if (activeTab === "Alumni") return job.createdBy?.role === "alumni";
    if (activeTab === "Faculty") return job.createdBy?.role === "faculty";
    return false;
  });

  return (
    <div className="w-full">
      {/* Tabs Section */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4">
        {tabs.map((tab) => (
          <button
            key={tab}//d
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-full font-semibold ${
              activeTab === tab ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job Cards Section */}
      <div className="p-4">
        {loading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p>No jobs found for {activeTab}.</p>
        )}
      </div>
    </div>
  );
};

export default JobContent;
