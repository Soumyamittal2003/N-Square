import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import UserCard from "./UserCard";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosinstance";
import { toast } from "react-toastify";

const Following = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [followingUsers, setFollowingUsers] = useState([]); // List of followed users
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      setLoading(true);
      const currentUserId = localStorage.getItem("id");

      try {
        // Fetch current user's following list
        const currentUserResponse = await axiosInstance.get(
          `/users/${currentUserId}`
        );
        const followingIds = currentUserResponse.data.data.following;

        // Fetch detailed user data for each ID
        const userDetails = await Promise.all(
          followingIds.map(async (id) => {
            const userResponse = await axiosInstance.get(`/users/${id}`);
            return userResponse.data.data;
          })
        );

        setFollowingUsers(userDetails); // Set only followed users
        toast.success("Following loaded successfully!");
      } catch (error) {
        console.error("Error fetching following users:", error);
        toast.error("Failed to load following users.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = followingUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(lowercasedQuery) ||
          user.lastName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [searchQuery, followingUsers]);

  const handleUnfollow = async (id) => {
    const currentUserId = localStorage.getItem("id");
    try {
      await axiosInstance.post(`/users/unfollow-user/${id}`, { currentUserId });
      setFollowingUsers((prev) => prev.filter((user) => user._id !== id)); // Remove unfollowed user
      toast.success("User unfollowed successfully!");
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("Failed to unfollow the user.");
    }
  };

  return (
    <div className="w-3/4">
      {/* Header Section */}
      <div className="flex mx-8 mt-6 items-center justify-between px-4 py-2 bg-white">
        <div className="flex mx-28 gap-8 items-center">
          <Link to={"/dashboard"}>
            <FaArrowLeft className="h-6 w-6" />
          </Link>
          <span className="text-xl">{filteredUsers.length} Following</span>
        </div>

        <div className="flex w-1/3 items-center rounded-md border border-gray-700 mx-12 px-3 py-1 bg-white">
          <CiSearch />
          <input
            type="text"
            placeholder="Search Following"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm py-1 px-2 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Following List */}
      <div className="w-full bg-white p-4 h-[calc(100vh-260px)] overflow-y-auto hide-scrollbar">
        {loading ? (
          <p>Loading...</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              isFollowing={true} // Always true for these users
              onUnfollow={() => handleUnfollow(user._id)}
            />
          ))
        ) : (
          <p>No following users found.</p>
        )}
      </div>
    </div>
  );
};

export default Following;
