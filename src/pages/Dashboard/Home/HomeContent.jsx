import { useState, useEffect } from "react";
import PostCard from "../Common/PostCard";
import axiosInstance from "../../../utils/axiosinstance";

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const currentUserId = "67363daf6410c39c2629897b"; // Example current user ID

  const tabs = [
    "All",
    "Origination Post",
    "Alumni Post",
    "Student Post",
    "Facility Post",
  ];

  // Fetch posts and user data
  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const response = await axiosInstance.get("/post");
        const postsData = response.data;
        setPosts(postsData);

        const userIds = [...new Set(postsData.map((post) => post.createdBy))];
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
        console.error("Error fetching posts or users:", error);
      }
    };

    fetchPostsAndUsers();
  }, []);

  // Handle like post
  const handleLikePost = async (postId) => {
    try {
      await axiosInstance.post(`/post/${postId}/like`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(currentUserId)
                  ? post.likes.filter((id) => id !== currentUserId)
                  : [...post.likes, currentUserId],
                dislikes: post.dislikes.filter((id) => id !== currentUserId),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  // Handle dislike post
  const handleDislikePost = async (postId) => {
    try {
      await axiosInstance.post(`/post/${postId}/dislike`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                dislikes: post.dislikes.includes(currentUserId)
                  ? post.dislikes.filter((id) => id !== currentUserId)
                  : [...post.dislikes, currentUserId],
                likes: post.likes.filter((id) => id !== currentUserId),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

  // Handle follow user
  const handleFollowUser = async (userId) => {
    try {
      await axiosInstance.post(`/users/follow-user/${userId}`, {
        currentUserId,
      });
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    const user = users[post.createdBy];
    if (!user) return false;

    if (activeTab === "All") return true;
    if (activeTab === "Origination Post") return user.role === "organization";
    if (activeTab === "Alumni Post") return user.role === "alumni";
    if (activeTab === "Student Post") return user.role === "student";
    if (activeTab === "Facility Post") return user.role === "faculty";

    return false;
  });

  return (
    <div className="w-1/2">
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

      {/* Posts Section */}
      <div className="w-full bg-[#ffffff] p-4 h-[calc(100vh-150px)] overflow-y-auto hide-scrollbar">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const user = users[post.createdBy];
            return (
              <PostCard
                key={post._id}
                post={post}
                user={user}
                currentUserId={currentUserId}
                onLikePost={handleLikePost}
                onDislikePost={handleDislikePost}
                onFollowUser={handleFollowUser}
              />
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
