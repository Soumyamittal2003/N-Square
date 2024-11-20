import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../Common/PostCard";

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState([]);
  const tabs = [
    "All",
    "Origination Post",
    "Alumni Post",
    "Student Post",
    "Facility Post",
  ];

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://n-square.onrender.com/api/network-next/v1/post/"
        );
        setPosts(response.data); // Assuming API response returns an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on the active tab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "All") return true;
    if (activeTab === "Origination Post") return post.createdBy === "ORIGIN_ID"; // Replace with actual filter logic
    if (activeTab === "Alumni Post") return post.createdBy === "ALUMNI_ID"; // Replace with actual filter logic
    if (activeTab === "Student Post") return post.createdBy === "STUDENT_ID"; // Replace with actual filter logic
    if (activeTab === "Facility Post") return post.createdBy === "FACILITY_ID"; // Replace with actual filter logic
    return true;
  });

  return (
    <div className="w-1/2">
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4 ">
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
      <div className="w-full bg-[#ffffff] p-4 h-[calc(100vh-150px)] overflow-y-auto hide-scrollbar">
        {filteredPosts.map((post) => (
          <PostCard
            key={post._id}
            text={post.description}
            images={[post.postPhoto]}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
