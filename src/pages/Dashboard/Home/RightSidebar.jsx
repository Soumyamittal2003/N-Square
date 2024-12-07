import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";

const RightSidebar = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch the current user from local storage
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("chat-app-current-user"));
        if (storedUser && storedUser._id) {
          setCurrentUserId(storedUser._id);
          console.log("Current user ID fetched successfully:", storedUser._id);
        } else {
          console.error("No current user found in localStorage");
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch suggested users based on the current user ID
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      if (!currentUserId) {
        console.error("currentUserId is null or undefined");
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching suggested users for user ID: ${currentUserId}`);

        // Fetch suggested user IDs
        const { data: suggestedResponse } = await axiosInstance.get(
          `/recommadation/suggested-users/${currentUserId}`
        );

        if (suggestedResponse.success && suggestedResponse.data.length > 0) {
          console.log("Suggested user IDs fetched successfully:", suggestedResponse.data);

          const userPromises = suggestedResponse.data.map((id) =>
            axiosInstance.get(`/users/${id}`)
          );

          // Fetch details of each suggested user
          const usersData = await Promise.all(userPromises);
          const suggestedProfiles = usersData.map((res) => ({
            id: res.data.data._id,
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            role: res.data.data.role,
            tagLine: res.data.data.tagLine,
            profileImageUrl: res.data.data.profileimageUrl,
          }));

          console.log("Suggested profiles fetched successfully:", suggestedProfiles);
          setSuggestedUsers(suggestedProfiles);
        } else {
          console.warn("No suggested users found.");
        }
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchSuggestedUsers();
    }
  }, [currentUserId]);

  return (
    <div className="w-1/3 mt-4 bg-white px-4">
      {/* Upcoming Events Section */}
      <div className="border p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Upcoming Events</h3>
          <button className="text-black font-semibold text-sm hover:underline">
            Explore All
          </button>
        </div>

        {/* Event Cards */}
        <div className="grid gap-2 mt-2">
          {[1, 2].map((event, index) => (
            <div
              key={index}
              className="grid grid-cols-[80px_1fr] gap-4 items-center p-1"
            >
              <img
                src="https://via.placeholder.com/80"
                alt="Event Thumbnail"
                className="rounded-md w-20 h-20 object-cover"
              />
              <div>
                <p className="text-sm font-semibold line-clamp-2">
                  Investing Live: Opportunities and Risk Management
                  #investingtips #live #riskmanagement
                </p>
                <div className="flex justify-between mt-3">
                  <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                    Share
                  </button>
                  <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Profiles Section */}
      <div className="px-2 py-2 rounded-lg mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Suggested Profiles</h3>
          <button className="text-black font-semibold text-sm hover:underline">
            View All
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center mt-4">Loading...</p>
        ) : (
          <div className="grid gap-4 mt-2">
            {suggestedUsers.length > 0 ? (
              suggestedUsers.map((profile) => (
                <div
                  key={profile.id}
                  className="grid grid-cols-[50px_1fr] gap-2 border shadow-sm items-center rounded-lg px-4 py-2"
                >
                  <img
                    src={profile.profileImageUrl || "https://via.placeholder.com/50"}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-md">
                        {profile.firstName} {profile.lastName}
                      </h4>
                      <button className="text-black font-bold px-2 border border-black items-center justify-center rounded-full text-base hover:bg-black hover:text-white transition">
                        <span className="text-lg">+</span> Follow
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {profile.tagLine  || "No tagline available"}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                    { profile.role}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No suggested profiles found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
