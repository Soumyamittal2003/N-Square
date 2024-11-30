import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import AppliedCard from "./AppliedJob";

const AppliedContent = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch current user from localStorage
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("chat-app-current-user"));
      if (storedUser && storedUser._id) {
        setCurrentUserId(storedUser._id);
      } else {
        console.error("No current user found in localStorage");
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch applied jobs for the current user
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (currentUserId) {
          const response = await axiosInstance.get(`/jobs/apply/${currentUserId}`);
          if (response.data.success) {
            const appliedJobs = response.data.appliedJobs || [];
            // Fetch job details for each applied job
            const jobDetailsPromises = appliedJobs.map(async (jobId) => {
              const jobResponse = await axiosInstance.get(`/jobs/${jobId}`);
              return jobResponse.data.job;
            });
            const fetchedJobs = await Promise.all(jobDetailsPromises);
            setJobs(fetchedJobs);
          }
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [currentUserId]);

  if (loading) {
    return <p>Loading applied jobs...</p>;
  }

  if (!jobs.length) {
    return <p>No applied jobs found.</p>;
  }

  return (
    <div className="w-full p-4 overflow-y-auto hide-scrollbar" style={{ maxHeight: "calc(100vh - 160px)" }}>
      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job) => (
          <AppliedCard key={job._id} job={job} currentUserId={currentUserId} />
        ))}
      </div>
    </div>
  );
};

export default AppliedContent;
