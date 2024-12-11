import { useState, useEffect } from "react";
import PostCard from "../common/PostCard";
import axiosInstance from "../../../utils/axiosinstance";
import { toast } from "react-toastify";

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [data, setData] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchCurrentUserId = localStorage.getItem("chat-app-current-user");
  const currentUserId = fetchCurrentUserId?._id;

  const tabs = ["Posts", "Projects", "Events", "Jobs", "Story"];

  // Generic fetch function for different types of content
  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/${endpoint}`);
      const data = response.data;
      setData(data);

      const userIds = [...new Set(data.map((item) => item.createdBy))];
      const userResponses = await Promise.all(
        userIds.map((id) =>
          axiosInstance
            .get(`/users/${id}`)
            .then((res) => ({ id, data: res.data.data }))
            .catch((err) => {
              console.error(`Error fetching user ${id}:`, err);
              return null;
            })
        )
      );

      const usersData = userResponses
        .filter((response) => response !== null)
        .reduce((acc, { id, data }) => ({ ...acc, [id]: data }), {});

      setUsers(usersData);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on the active tab
  useEffect(() => {
    const endpoints = {
      Posts: "post",
      Projects: "projects",
      Events: "events",
      Jobs: "jobs",
      Stories: "stories",
    };

    fetchData(endpoints[activeTab]);
  }, [activeTab]);

  // Handle like post
  const handleLikePost = async (postId) => {
    if (loading) return;
    setLoading(true);
    try {
      await axiosInstance.post(`/post/${postId}/like`);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === postId
            ? {
                ...item,
                likes: item.likes.includes(currentUserId)
                  ? item.likes.filter((id) => id !== currentUserId)
                  : [...item.likes, currentUserId],
                dislikes: item.dislikes.filter((id) => id !== currentUserId),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle dislike post
  const handleDislikePost = async (postId) => {
    if (loading) return;
    setLoading(true);
    try {
      await axiosInstance.post(`/post/${postId}/dislike`);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === postId
            ? {
                ...item,
                dislikes: item.dislikes.includes(currentUserId)
                  ? item.dislikes.filter((id) => id !== currentUserId)
                  : [...item.dislikes, currentUserId],
                likes: item.likes.filter((id) => id !== currentUserId),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error disliking the post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle follow user
  const handleFollowUser = async (userId) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/users/follow-user/${userId}`,
        {
          currentUserId,
        }
      );

      if (response.data.success) {
        toast.success("Successfully followed the user!");
      } else {
        toast.warn(response.data.message || "Already following this user.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error following the user. Please try again."
      );
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sort data by createdAt, descending
  const sortedData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="w-3/4 mx-auto">
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

      {/* Content Section */}
      <div className="w-11/12 bg-[#ffffff] mx-auto h-[calc(100vh-150px)] overflow-y-auto hide-scrollbar">
        {sortedData.length > 0 ? (
          sortedData.map((item) => {
            const user = users[item.createdBy];
            return (
              <PostCard
                key={item._id}
                post={item}
                user={user}
                currentUserId={currentUserId}
                onLikePost={handleLikePost}
                onDislikePost={handleDislikePost}
                onFollowUser={handleFollowUser}
                loading={loading}
              />
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            No {activeTab.toLowerCase()} available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
