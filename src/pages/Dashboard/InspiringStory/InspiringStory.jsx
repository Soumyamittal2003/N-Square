import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";  // Assuming axiosInstance is configured similarly to JobContent
import StoryCard from "./StoryCard";
import RightSidebar from "./RightSideBar";

const InspiringStory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [rolesFetched, setRolesFetched] = useState(false);
  const tabs = ["All", "Funding Stories", "Impact Stories"];

  // Fetching current user from localStorage
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

  // Fetching stories from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get("/stories/all");
        if (response.data.success) {
          setStories(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Fetching user roles and details for each story's creator (createdBy)
  useEffect(() => {
    const fetchRolesForStories = async () => {
      const updatedStories = await Promise.all(
        stories.map(async (story) => {
          if (story.createdBy) {
            try {
              const response = await axiosInstance.get(
                `http://localhost:5001/api/network-next/v1/users/get-user-by-id/${story.createdBy._id}`
              );
              return {
                ...story,
                createdBy: {
                  ...story.createdBy,
                  role: response.data.data.role,
                  firstName: response.data.data.firstName,
                  lastName: response.data.data.lastName,
                },
              };
            } catch (error) {
              console.error(`Failed to fetch role for story ${story._id}:`, error);
              return story;
            }
          }
          return story;
        })
      );

      setStories(updatedStories);
      setRolesFetched(true);
    };

    if (stories.length && !rolesFetched) {
      fetchRolesForStories();
    }
  }, [stories, rolesFetched]);

  // Filter stories based on selected tab
  const filteredStories = stories.filter((story) => {
    if (activeTab === "All") return true;
    if (activeTab === "Funding Stories") return story.title.includes("Funding");
    if (activeTab === "Impact Stories") return story.title.includes("Impact");
    return false;
  });

  if (loading) {
    return <p>Loading stories...</p>;
  }

  if (!filteredStories.length) {
    return <p>No stories found for {activeTab}.</p>;
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

      {/* Story Cards Section */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[30%] mx-6">
        <RightSidebar />
      </div>
    </div>
  );
};

export default InspiringStory;
