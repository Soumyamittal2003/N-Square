import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import StoryCard from "./StoryCard";
import RightSidebar from "./RigntSideBar";
import Cookies from "js-cookie";

// InspiringStory Component
const InspiringStory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = Cookies.get("id");
  const tabs = ["All", "Funding Stories", "Impact Stories"];

  // Fetch stories data from the backend API
  // In your API response handler, sanitize the story data
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get("/stories/all");
        if (response.data.success) {
          // Ensure that each story has a valid likedBy array (fallback to empty array)
          const sanitizedStories = response.data.data.map((story) => ({
            ...story,
            likedBy: Array.isArray(story.likedBy) ? story.likedBy : [],
            content: story.content || "No content available.", // Default content message
          }));
          setStories(sanitizedStories);
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
  const filteredStories = (stories || []).filter((story) => {
    if (activeTab === "All") return true;
    if (activeTab === "Funding Stories") return story.title.includes("Funding");
    if (activeTab === "Impact Stories") return story.title.includes("Impact");
    return false;
  });

  // Handle like functionality
  const handleLike = async (storyId) => {
    try {
      const response = await axiosInstance.post(
        `/stories/like-story/${storyId}`,
        { userId: currentUserId }
      );
      if (response.data.success) {
        setStories((prevStories) =>
          prevStories.map((story) =>
            story._id === storyId
              ? {
                  ...story,
                  likedBy: Array.isArray(response.data.likedBy)
                    ? response.data.likedBy
                    : [], // Ensure it's an array
                }
              : story
          )
        );
      }
    } catch (error) {
      console.error("Error liking story:", error);
    }
  };

  // Handle follow functionality
  const handleFollowUser = async (userIdToFollow) => {
    if (!currentUserId) {
      console.error("User is not logged in.");
      return;
    }

    try {
      // Check if the user is already following the target user
      const alreadyFollowing = stories.some(
        (story) =>
          story.createdBy._id === userIdToFollow &&
          story.likedBy.includes(currentUserId)
      );

      if (alreadyFollowing) {
        console.log("Already following this user.");
        return;
      }

      // Optimistic UI update: Temporarily mark as followed
      setStories((prevStories) =>
        prevStories.map((story) =>
          story.createdBy._id === userIdToFollow
            ? { ...story, followedBy: [...story.followedBy, currentUserId] }
            : story
        )
      );

      // Perform API request to follow user
      const response = await axiosInstance.post(`/users/follow`, {
        // followerId: currentUserId,
        followingId: userIdToFollow,
      });

      if (response.data.success) {
        console.log("User followed successfully");
        // Optionally, update followed state after successful API call if needed
        setStories((prevStories) =>
          prevStories.map((story) =>
            story.createdBy._id === userIdToFollow
              ? { ...story, followedBy: [...story.followedBy, currentUserId] }
              : story
          )
        );
      } else {
        console.error("Failed to follow user:", response.data.message);
      }
    } catch (error) {
      console.error("Error following user:", error);
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
              className={`text-sm px-4 py-2 rounded-full font-semibold ${activeTab === tab ? "text-black font-bold" : "text-gray-500"}`}
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
                storyImage={story.storyImage}
                title={story.title}
                description={story.content || "No content available."} // Default message if no content
                createdBy={story.createdBy}
                createdAt={story.createdAt}
                likes={story.likedBy.length}
                onLike={handleLike}
                onFollowUser={handleFollowUser}
                currentUserId={currentUserId}
                storyId={story._id}
                likedBy={story.likedBy}
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
