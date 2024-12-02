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
    e.stopPropagation();
    onLikeEvent(event._id);
  };

  const handleDislike = (e) => {
    e.stopPropagation();
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
    <div className="w-[300px] border border-gray-200 rounded-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col justify-between">
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.eventphoto}
          alt={event.title}
          className="w-full h-[180px] rounded-lg object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs py-1 px-2 rounded-lg">
          {new Date(event.date).toLocaleDateString()}
        </div>
      </div>

      {/* Event Details */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-800">{event.title}</h4>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Speaker: </strong>
          {event.speaker}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {event.tagsTopic.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-600 py-1 px-3 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer with Buttons */}
      <footer className="flex justify-between items-center mt-5">
        <div className="flex gap-2 items-center">
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={handleLike}
          >
            <img src={arrowBlockUp} alt="Thumbs Up" className="w-4 h-4" />
            <span className="text-sm">{event.likes.length}</span>
          </button>
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
            onClick={handleDislike}
          >
            <img src={arrowBlockDown} alt="Thumbs Down" className="w-4 h-4" />
            <span className="text-sm">{event.dislikes.length}</span>
          </button>
        </div>

        {/* Register Button */}
        <button
          className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition ${
            isRegistered
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleRegister}
          disabled={isRegistered || loading} // Disable if already registered or loading
        >
          {loading ? "Registering..." : isRegistered ? "Registered" : "Register"}
        </button>
      </footer>

      {/* Details Link */}
      <div className="mt-4">
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default EventCard;
