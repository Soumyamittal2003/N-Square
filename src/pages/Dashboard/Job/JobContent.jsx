import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance"; // Make sure this is correctly pointing to your axios instance
import JobCard from "./JobCard";

const JobContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ["All", "Alumni", "Faculty"];

  // Function to fetch user by ID
  const fetchUserById = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      if (response.data.success) {
        return response.data.user;  // Returns user data if successful
      }
      return null;
    } catch (err) {
      console.error("Error fetching user data:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchJobsAndUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch jobs
        const jobResponse = await axiosInstance.get("/jobs/all");
        if (jobResponse.data.success) {
          setJobs(jobResponse.data.jobs || []);
        } else {
          setError("Failed to fetch jobs.");
        }

        // Fetch users based on job createdBy IDs
        const userData = {};
        for (const job of jobResponse.data.jobs) {
          const userId = job.createdBy?._id;
          if (userId && !userData[userId]) {
            const user = await fetchUserById(userId);
            if (user) {
              userData[userId] = user;
            }
          }
        }
        setUsers(userData);
      } catch (err) {
        setError("Failed to fetch data. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndUsers();
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
            {filteredJobs.map((job) => {
              // Get user data by createdBy ID
              const createdByData = users[job.createdBy?._id];

              return (
                <JobCard
                  key={job._id}
                  job={job}
                  createdByData={createdByData}
                />
              );
            })}
          </div>
        ) : (
          <p>No jobs found for {activeTab}.</p>
        )}
      </div>
    </div>
  );
};

export default JobContent;
