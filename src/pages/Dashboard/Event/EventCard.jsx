import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockDown from "../../../assets/icons/arrow-block-down.svg";

const EventCard = ({
  event,
  currentUserId,
  onLikeEvent,
  onDislikeEvent,
  onSelectEvent,
  isSelected,
}) => {
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration
  const [loading, setLoading] = useState(false); // Loading state for registration

  // Load registration status from localStorage
  useEffect(() => {
    const registeredEvents =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];
    if (registeredEvents.includes(event._id)) {
      setIsRegistered(true);
    }
  }, [event._id]);

  const handleNavigate = () => {
    navigate(`/dashboard/event/about-event`, {
      state: {
        ...event,
      },
    });
  };

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent navigation
    onLikeEvent(event._id);
  };

  const handleDislike = (e) => {
    e.stopPropagation(); // Prevent navigation
    onDislikeEvent(event._id);
  };

  // Handle Registration Action
  const handleRegister = async (e) => {
    e.stopPropagation(); // Prevent navigation
    setLoading(true); // Start loading

    try {
      // Send API request to register the user
      const response = await axiosInstance.post(
        `/event/register-event/${event._id}`,
        { userId: currentUserId } // Sending the user ID to register the user
      );

      if (response.data.message === "Event Registration successful") {
        setIsRegistered(true);

        // Update localStorage to reflect the registration status
        const registeredEvents =
          JSON.parse(localStorage.getItem("registeredEvents")) || [];
        if (!registeredEvents.includes(event._id)) {
          registeredEvents.push(event._id);
          localStorage.setItem(
            "registeredEvents",
            JSON.stringify(registeredEvents)
          );
        }
      }
    } catch (error) {
      console.error("Error registering for event:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-[290px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 cursor-pointer flex flex-col justify-between">
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.eventphoto}
          alt={event.title}
          className="w-full h-[150px] rounded-lg object-cover"
          style={{ aspectRatio: "16/9" }}
        />
      </div>

      <div>
        <div className="flex gap-3 justify-between items-start self-center mt-2 w-full">
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()} • {event.time}
          </p>
        </div>
        <h4 className="text-md font-semibold mt-1">{event.title}</h4>
        <p className="text-sm text-gray-500 flex items-center">
          <strong>Speaker:-</strong> {event.speaker}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-5 mt-2">
          {event.tagsTopic.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer with Register Button and Like/Dislike Buttons */}
      <footer className="flex justify-between items-center mt-4 w-full">
        <div className="flex gap-3 items-center">
          <button
            className="flex gap-1 items-center font-semibold justify-center"
            onClick={handleLike}
          >
            <img src={arrowBlockUp} alt="Thumbs Up" />
            <span>{event.likes.length}</span>
          </button>
          <button
            className="flex gap-1 items-center font-semibold justify-center"
            onClick={handleDislike}
          >
            <img src={arrowBlockDown} alt="Thumbs Down" />
            <span>{event.dislikes.length}</span>
          </button>
        </div>

        {/* Register Button */}
        <button
          className={`px-7 py-1.5 text-white rounded-xl ${
            isRegistered ? "bg-green-600" : "bg-blue-600"
          }`}
          onClick={handleRegister}
          disabled={isRegistered || loading} // Disable if already registered or loading
        >
          {loading ? "Registering..." : isRegistered ? "Registered" : "Register"}
        </button>
      </footer>

      {/* Details Button */}
      <div className="mt-2">
        <button
          className="text-sm text-blue-600 underline mt-2 self-start"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation from like/dislike click
            handleNavigate();
          }}
        >
          Click here for more details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
