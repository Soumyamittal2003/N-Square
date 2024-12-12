import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance"; // Assuming axiosInstance is set up for API calls
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Import js-cookie to access cookies
import PostCard from "../common/PostCard"; // Component to display posts
import EventCard from "../Event/EventCard"; // Component to display events
import JobCard from "../JOb/JobCard"; // Component to display jobs

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState("Posts"); // Active tab (Posts, Events, Jobs)
  const [posts, setPosts] = useState([]); // State to hold posts data
  const [events, setEvents] = useState([]); // State to hold events data
  const [jobs, setJobs] = useState([]); // State to hold jobs data
  const [loading, setLoading] = useState(false); // Loading state
  const fetchCurrentUserId = localStorage.getItem("chat-app-current-user");
  const currentUserId = fetchCurrentUserId?._id;

  // Get the created_for ID from cookies
  const createdForId = Cookies.get("created_for");

  // Fetch posts data
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/organizations/all-posts");
      const filteredPosts = response.data.posts.filter(
        (post) => post.created_for === createdForId
      );
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events data
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/organizations/all-events");
      const filteredEvents = response.data.events.filter(
        (event) => event.created_for === createdForId
      );
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs data
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/organizations/all-jobs");
      const filteredJobs = response.data.jobs.filter(
        (job) => job.created_for === createdForId
      );
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the active tab changes
  useEffect(() => {
    if (activeTab === "Posts") {
      fetchPosts();
    } else if (activeTab === "Events") {
      fetchEvents();
    } else if (activeTab === "Jobs") {
      fetchJobs();
    }
  }, [activeTab]);

  return (
    <div className="w-3/4 mx-auto">
      {/* Tabs Section */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4">
        {["Posts", "Events", "Jobs"].map((tab) => (
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

      {/* Content Section */}
      <div className="w-11/12 bg-[#ffffff] mx-auto h-[calc(100vh-150px)] overflow-y-auto hide-scrollbar">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : activeTab === "Posts" ? (
          posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No posts available.</p>
          )
        ) : activeTab === "Events" ? (
          events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No events available.</p>
          )
        ) : activeTab === "Jobs" ? (
          jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No jobs available.</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default HomeContent;
