import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const FindGroup = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch groups and their creators' names
    const fetchGroups = async () => {
      try {
        // Use axiosInstance to fetch the groups
        const response = await axiosInstance.get("/groups/get-all-groups");

        if (response.data.success) {
          // Fetch user data for each group creator
          const groupsWithCreators = await Promise.all(
            response.data.groups.map(async (group) => {
              const userResponse = await axiosInstance.get(
                `/users/${group.createdBy}`
              );
              const userData = userResponse.data;

              return {
                ...group,
                creatorName: userData.success
                  ? `${userData.data.firstName} ${userData.data.lastName}`
                  : "Unknown Creator",
              };
            })
          );

          setGroups(groupsWithCreators);
          setFilteredGroups(groupsWithCreators);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);
  const handleAddMember = async (groupId) => {
    try {
      const memberId = Cookies.get("id");

      const response = await axiosInstance.post(
        `/groups/add-member/${groupId}`,
        { memberId }
      );

      if (response.data.success) {
        toast.success("Member added successfully!");
      } else {
        toast.error("Failed to add member.");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert("An error occurred while adding the member.");
    }
  };

  // Handle search
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredGroups(groups);
    } else {
      setFilteredGroups(
        groups.filter((group) =>
          group.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, groups]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-2/5 p-4 mt-10 container mx-auto items-center justify-center ">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Find Group"
          className="w-full border rounded-md p-2 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Group List */}
      <ul className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
        {filteredGroups.map((group) => (
          <li
            key={group._id}
            className="flex justify-between items-center p-4 border rounded-md border-gray-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  group.groupProfileImage || "https://via.placeholder.com/48"
                }
                alt={`${group.name} group`}
                className="bg-gray-300 rounded-full w-12 h-12"
              />
              <div>
                <h3 className="font-bold">{group.name}</h3>
                <p className="text-gray-500">{`${group.members.length} members`}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">
                {new Date(group.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">
                Created By: {group.creatorName}
              </p>
              <button
                onClick={() => handleAddMember(group._id)}
                className="text-black underline text-md mt-2"
              >
                Request To Join
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindGroup;
