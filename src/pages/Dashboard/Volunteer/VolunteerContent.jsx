import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance"; // Assuming axiosInstance is set up
import VolunteerCard from "./VolunteerCard";

const VolunteerContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [volunteerPositions, setVolunteerPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch volunteer positions with event details
  useEffect(() => {
    const fetchVolunteerPositions = async () => {
      try {
        const response = await axiosInstance.get(
          "/volunteer/get-all-volunteer-position"
        );
        if (response.data && Array.isArray(response.data)) {
          const positionsWithEvents = await Promise.all(
            response.data.map(async (position) => {
              try {
                const eventResponse = await axiosInstance.get(
                  `/event/${position.eventId}`
                );
                return {
                  ...position,
                  eventDetails: eventResponse.data?.event,
                };
              } catch (eventError) {
                console.error(
                  `Error fetching event for position ${position._id}:`,
                  eventError
                );
                return position; // Fallback to just the position details
              }
            })
          );
          setVolunteerPositions(positionsWithEvents);
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
            positionTitle={position.positionTitle}
            skills={position.skills}
            availablePositions={position.availablePositions}
            createdAt={position.createdAt}
            rolesResponsibility={position.rolesResponsibility}
            eligibility={position.eligibility}
            eventTitle={position.eventDetails?.title}
            venue={position.eventDetails?.venue}
            link={position.eventDetails?.link}
            date={position.eventDetails?.date}
            time={position.eventDetails?.time}
            eventCoordinator={position.eventDetails?.eventCoordinator}
            coordinatorPhone={position.eventDetails?.coordinatorphone}
          />
        ))}
      </div>
    </div>
  );
};

export default VolunteerContent;
