import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import JobCard from "../Job/JobCard";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs
  const [jobs, setJobs] = useState([]); // Store all jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [currentUser, setCurrentUser] = useState(null); // Store current user

  // Fetch all jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/jobs/all");
        if (response.data.success) {
          setJobs(response.data.jobs || []);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch current user data and applied jobs
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("chat-app-current-user"));
      if (storedUser && storedUser._id) {
        setCurrentUser(storedUser);
        setAppliedJobs(storedUser.appliedJobs || []);
      }
    };

    fetchCurrentUser();
  }, []);

  // Handle job application
  const handleApplyJob = async (jobId) => {
    if (!currentUser) {
      console.error("User not found.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/jobs/apply/${jobId}`, {
        userId: currentUser._id,
      });

      if (response.data.success) {
        // Update the applied jobs list
        const updatedAppliedJobs = [...appliedJobs, jobId];
        setAppliedJobs(updatedAppliedJobs);

        // Also update the current user's applied jobs in local storage
        const updatedUser = { ...currentUser, appliedJobs: updatedAppliedJobs };
        localStorage.setItem("chat-app-current-user", JSON.stringify(updatedUser));

        // Optionally, display a success message
        console.log("Job application successful.");
      } else {
        console.error("Job application failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  // Display loading or applied jobs
  if (loading) {
    return <p>Loading applied jobs...</p>;
  }

  return (
    <div className="w-full p-4">
      <h3 className="font-semibold text-xl mb-4">Your Applied Jobs</h3>
      <div className="grid grid-cols-3 gap-4">
        {appliedJobs.length ? (
          appliedJobs.map((jobId) => {
            const job = jobs.find((job) => job._id === jobId);
            return job ? (
              <JobCard
                key={job._id}
                job={job}
                currentUserId={currentUser._id}
                appliedJobs={appliedJobs}
                onApplyJob={handleApplyJob}
              />
            ) : null;
          })
        ) : (
          <p>No applied jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
