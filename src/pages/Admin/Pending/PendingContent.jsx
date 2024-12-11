import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosinstance";
import Cookies from "js-cookie";

const PendingContent = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        // Fetch pending and approved users
        const usersResponse = await axiosInstance.get("/users/get-all-users");
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = users.filter((user) => {
        const matchesTab =
          (activeTab === "Pending" && !user.isApproved) ||
          (activeTab === "Approved" && user.isApproved);

        const matchesSearch =
          user.firstName.toLowerCase().includes(lowercasedQuery) ||
          user.lastName.toLowerCase().includes(lowercasedQuery);

        return matchesTab && matchesSearch;
      });

      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [activeTab, searchQuery, users]);

  const handleApprove = async (id) => {
    try {
      await axiosInstance.post(`/users/approve-user/${id}`);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isApproved: true } : user
        )
      );
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.post(`/users/reject-user/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };



  return (
    <div className="w-3/4 mx-auto mt-6">
      {/* Tab Navigation */}
      

      {/* Header Section */}
      <div className="p-6 flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md mb-4">
        <div className="flex items-center gap-4">
          <Link to={"/dashboard"}>
            <FaArrowLeft className="h-6 w-6 text-gray-700 hover:text-gray-900" />
          </Link>
          <span className="text-2xl font-semibold">
            {filteredUsers.length} {activeTab} Users
          </span>
        </div>

        <div className="flex w-1/4 items-center rounded-md border border-gray-300 px-3 py-1 bg-white">
          <CiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm py-1 px-2 text-gray-700 border-none outline-none"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="w-full bg-white p-4 h-[calc(110vh-220px)] overflow-y-auto hide-scrollbar rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profileImageUrl || "https://via.placeholder.com/50"}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-bold">
                    {user.firstName} {user.lastName}
                  </h4>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {activeTab === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No {activeTab.toLowerCase()} users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingContent;
