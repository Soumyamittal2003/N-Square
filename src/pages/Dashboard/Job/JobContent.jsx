import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import JobCard from "./JobCard";

const JobContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesFetched, setRolesFetched] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const tabs = ["All", "Alumni", "Faculty"];

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
              return job;
            }
          }
          return job;
        })
      );

      setJobs(updatedJobs);
      setRolesFetched(true);
    };

    if (jobs.length && !rolesFetched) {
      fetchRolesForJobs();
    }
  }, [jobs, rolesFetched]);

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

  const handleDislikePost = async (jobId) => {
    try {
      await axiosInstance.post(`/jobs/dislike/${jobId}`, {
        userId: currentUserId,
      });
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

  const handleBookmarkJob = async (jobId) => {
    try {
      const isBookmarked = userBookmarks.includes(jobId);
      await axiosInstance.post(`/jobs/save-job/${jobId}`, {
        userId: currentUserId,
        action: isBookmarked ? "remove" : "add",
      });

      setUserBookmarks((prevBookmarks) =>
        isBookmarked
          ? prevBookmarks.filter((id) => id !== jobId)
          : [...prevBookmarks, jobId]
      );
    } catch (error) {
      console.error(`Error bookmarking job ${jobId}:`, error);
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      await axiosInstance.post(`/jobs/apply/${jobId}`, { userId: currentUserId });
      setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, jobId]);
    } catch (error) {
      console.error(`Error applying for job ${jobId}:`, error);
    }
  };

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
              onApplyJob={handleApplyJob}
              appliedJobs={appliedJobs}
            />
          ))}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-4">Applied Jobs</h3>
        <div className="grid grid-cols-3 gap-4">
          {appliedJobs.map((jobId) => {
            const job = jobs.find((job) => job._id === jobId);
            return job ? (
              <JobCard
                key={job._id}
                job={job}
                currentUserId={currentUserId}
                onLikePost={handleLikePost}
                onDislikePost={handleDislikePost}
                onBookmarkJob={handleBookmarkJob}
                bookmarks={userBookmarks}
                onApplyJob={handleApplyJob}
                appliedJobs={appliedJobs}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default JobContent;
