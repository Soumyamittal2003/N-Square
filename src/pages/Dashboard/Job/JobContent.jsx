import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import JobCard from "./JobCard";

const JobContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesFetched, setRolesFetched] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState([]); // Track bookmarked jobs
  const [currentUserId, setCurrentUserId] = useState(null);
  const tabs = ["All", "Alumni", "Faculty"];

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

  // Fetch all jobs
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

  // Fetch roles dynamically for each job's creator
  useEffect(() => {
    const fetchRolesForJobs = async () => {
      const updatedJobs = await Promise.all(
        jobs.map(async (job) => {
          if (job.createdBy) {
            try {
              const response = await axiosInstance.get(`/users/${job.createdBy}`);
              return {
                ...job,
                createdBy: {
                  ...job.createdBy,
                  role: response.data.data.role,
                  firstName: response.data.data.firstName,
                  lastName: response.data.data.lastName,
                },
              };
            } catch (error) {
              console.error(`Failed to fetch role for job ${job._id}:`, error);
              return job; // Fallback to original job
            }
          }
          return job; // If no creator, return the job as-is
        })
      );

      setJobs(updatedJobs);
      setRolesFetched(true); // Mark roles as fetched
    };

    if (jobs.length && !rolesFetched) {
      fetchRolesForJobs();
    }
  }, [jobs, rolesFetched]);

  // Handle like action
  const handleLikePost = async (jobId) => {
    try {
      await axiosInstance.post(`/jobs/like/${jobId}`, { userId: currentUserId });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                likes: job.likes.includes(currentUserId)
                  ? job.likes.filter((id) => id !== currentUserId)
                  : [...job.likes, currentUserId],
                dislikes: job.dislikes.filter((id) => id !== currentUserId),
              }
            : job
        )
      );
    } catch (error) {
      console.error(`Error liking job ${jobId}:`, error);
    }
  };

  // Handle dislike action
  const handleDislikePost = async (jobId) => {
    try {
      await axiosInstance.post(`/jobs/dislike/${jobId}`, { userId: currentUserId });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                dislikes: job.dislikes.includes(currentUserId)
                  ? job.dislikes.filter((id) => id !== currentUserId)
                  : [...job.dislikes, currentUserId],
                likes: job.likes.filter((id) => id !== currentUserId),
              }
            : job
        )
      );
    } catch (error) {
      console.error(`Error disliking job ${jobId}:`, error);
    }
  };

  // Handle bookmark action
  const handleBookmarkJob = async (jobId) => {
    try {
      const isBookmarked = userBookmarks.includes(jobId);
      const action = isBookmarked ? "remove" : "add"; // toggle action
      const response = await axiosInstance.patch(`jobs/save-job/${jobId}`, {
        userId: currentUserId,
        action: action,
      });

      if (response.data.success) {
        // Update user bookmarks in state
        setUserBookmarks((prevBookmarks) =>
          action === "add"
            ? [...prevBookmarks, jobId]
            : prevBookmarks.filter((id) => id !== jobId)
        );
      } else {
        console.error("Failed to bookmark job:", jobId);
      }
    } catch (error) {
      console.error(`Error bookmarking job ${jobId}:`, error);
    }
  };

  // Filtering logic
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "All") return true;
    if (activeTab === "Alumni") return job.createdBy?.role === "alumni";
    if (activeTab === "Faculty") return job.createdBy?.role === "faculty";
    return false;
  });

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (!filteredJobs.length) {
    return <p>No jobs found for {activeTab}.</p>;
  }

  return (
    <div className="w-full">
      {/* Tabs Section */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-3 py-1 m-2">
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
      <div className="p-4 overflow-y-auto hide-scrollbar" style={{ maxHeight: 'calc(100vh - 160px)' }}>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              currentUserId={currentUserId}
              onLikePost={handleLikePost}
              onDislikePost={handleDislikePost}
              onBookmarkJob={handleBookmarkJob}
              bookmarks={userBookmarks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobContent;
