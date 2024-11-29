<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
>>>>>>> 97d48c2c7bb3e2cc8ee33909cda1d83b4635613a
import StoryCard from "./StoryCard";
import VideoStory from "./VideoStory";
import RightSidebar from "./RigntSideBar";

// InspiringStory Component
const InspiringStory = () => {
  const [activeTab, setActiveTab] = useState("All");
<<<<<<< HEAD
=======
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
>>>>>>> 97d48c2c7bb3e2cc8ee33909cda1d83b4635613a
  const tabs = ["All", "Funding Stories", "Impact Stories"];
  const trendingStories = [
    { id: 1, title: "Soumya", description: "Join our global network of seasoned forex traders for deep insights." },
    { id: 2, title: "Soumya", description: "Join our global network of seasoned forex traders for deep insights." },
    { id: 3, title: "Soumya", description: "Join our global network of seasoned forex traders for deep insights." },
  ];

<<<<<<< HEAD
  const videoStories = [
    { id: 1, videoSrc: "video1.mp4" },
    { id: 2, videoSrc: "video2.mp4" },
    { id: 3, videoSrc: "video3.mp4" },
  ];

  return (
    <div className="flex w-full ">
=======
  // Fetch current user ID from localStorage
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

  // Fetch stories data from the backend API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get("/stories/all");
        if (response.data.success) {
          setStories(response.data.data || []);
        } else {
          console.error("Error fetching stories:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Filter stories based on the active tab
  const filteredStories = stories.filter((story) => {
    if (activeTab === "All") return true;
    if (activeTab === "Funding Stories") return story.title.includes("Funding");
    if (activeTab === "Impact Stories") return story.title.includes("Impact");
    return false;
  });

  // Handle like/dislike functionality
  const handleLikeDislike = async (storyId, action) => {
    try {
      const response = await axiosInstance.post(`/stories/like-story/${storyId}`, { userId: currentUserId, action });
      if (response.data.success) {
        setStories((prevStories) =>
          prevStories.map((story) =>
            story._id === storyId
              ? { ...story, likedBy: response.data.likedBy }
              : story
          )
        );
      }
    } catch (error) {
      console.error("Error liking/disliking story:", error);
    }
  };

  if (loading) {
    return <p>Loading stories...</p>;
  }

  if (!filteredStories.length) {
    return <p>No stories found for {activeTab}.</p>;
  }

  return (
    <div className="flex w-full">
>>>>>>> 97d48c2c7bb3e2cc8ee33909cda1d83b4635613a
      {/* Main Content */}
      <div className="w-[70%] mx-8">
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

<<<<<<< HEAD
        {/* Trending Stories */}
=======
        {/* Stories Section */}
>>>>>>> 97d48c2c7bb3e2cc8ee33909cda1d83b4635613a
        <section className="my-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Stories</h2>
            <a href="#view-all" className="text-black font-semibold">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
<<<<<<< HEAD
            {trendingStories.map((story) => (
              <StoryCard
                key={story.id}
                title={story.title}
                description={story.description}
=======
            {filteredStories.map((story) => (
              <StoryCard
                key={story._id}
                title={story.title}
                description={story.content}
                createdBy={story.createdBy}
                createdAt={story.createdAt}
                likes={story.likedBy.length}
                onLikeDislike={handleLikeDislike}
                currentUserId={currentUserId}
                storyId={story._id}
                likedBy={story.likedBy}
>>>>>>> 97d48c2c7bb3e2cc8ee33909cda1d83b4635613a
              />
            ))}
          </div>
        </section>
<<<<<<< HEAD

        {/* Video Stories */}
        <section className="my-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Short Inspiring Stories</h2>
            <a href="#view-all" className="text-black font-semibold">
              View All
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {videoStories.map((video) => (
              <VideoStory key={video.id} videoSrc={video.videoSrc} />
            ))}
          </div>
        </section>
=======
>>>>>>> 97d48c2c7bb3e2cc8ee33909cda1d83b4635613a
      </div>

      {/* Right Sidebar */}
      <div className="w-[30%] mx-6 ">
        <RightSidebar />
      </div>
    </div>
  );
};

export default InspiringStory;
