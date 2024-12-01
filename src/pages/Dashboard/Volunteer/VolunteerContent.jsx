import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance"; // Assuming axiosInstance is set up
import VolunteerCard from "./VolunteerCard";

const VolunteerContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [volunteerPositions, setVolunteerPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch volunteer positions from the API
  useEffect(() => {
    const fetchVolunteerPositions = async () => {
      try {
        const response = await axiosInstance.get("/volunteer/get-all-volunteer-position");
        if (response.data && Array.isArray(response.data)) {
          setVolunteerPositions(response.data);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching volunteer positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerPositions();
  }, []);

  // Filter volunteer positions based on the search query
  const filteredPositions = volunteerPositions.filter((position) =>
    position.positionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading volunteer positions...</p>;
  }

  if (!filteredPositions.length) {
    return <p>No volunteer positions found.</p>;
  }

  return (
    <div className="w-full p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Find a Position"
          className="w-[700px] px-4 py-2 border border-gray-300 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Volunteer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPositions.map((position) => (
          <VolunteerCard
            key={position._id}
            functionName={position.positionTitle}
            date={new Date(position.createdAt).toLocaleDateString()} // Format date from `createdAt`
            time={new Date(position.createdAt).toLocaleTimeString()} // Format time from `createdAt`
            venue={`Available Positions: ${position.availablePositions}`}
            organizer={position.rolesResponsibility}
            contact={`Eligibility: ${position.eligibility}, Skills: ${position.skills}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VolunteerContent;
