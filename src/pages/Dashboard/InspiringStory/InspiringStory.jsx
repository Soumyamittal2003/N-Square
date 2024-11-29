import { useState, useEffect } from "react";
import axios from "axios";
import StoryCard from "./StoryCard";
import RightSidebar from "./RigntSideBar";
import axiosInstance from "../../../utils/axiosinstance";

// InspiringStory Component
const InspiringStory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  //const [userBookmarks, setUserBookmarks] = useState([]);
  const tabs = ["All", "Funding Stories", "Impact Stories"];

  // Fetch current user ID from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("chat-app-current-user"));
    if (currentUser) {
      setUserId(currentUser._id);
    }
  }, []);

  // Fetch stories data from the backend API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get("/stories/all/");
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

  // Handle like/unlike functionality
  const handleLikeDislike = async (storyId, action) => {
    try {
      const response = await axios.post(`/stories/like-story/${storyId}`, { userId, action });
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

        {/* Stories Section */}
        <section className="my-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Stories</h2>
            <a href="#view-all" className="text-black font-semibold">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {filteredStories.map((story) => (
              <StoryCard
                key={story._id}
                title={story.title}
                description={story.content}
                createdBy={story.createdBy}
                createdAt={story.createdAt}
                content={story.content}
                likes={story.likedBy.length}
                onLikeDislike={handleLikeDislike}
                userId={userId}
                storyId={story._id}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar */}
      <div className="w-[30%] mx-6">
        <RightSidebar />
      </div>
    </div>
  );
};

export default InspiringStory;
