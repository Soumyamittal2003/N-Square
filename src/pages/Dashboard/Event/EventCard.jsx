import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockDown from "../../../assets/icons/arrow-block-down.svg";
import { useNavigate } from "react-router-dom";

const EventCard = ({
  event,
  currentUserId,
  onLikeEvent,
  onDislikeEvent,
}) => {
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration
  const [loading, setLoading] = useState(false); // Loading state for registration
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.stopPropagation(); // Prevent navigation
    setLoading(true); // Start loading

    try {
      const response = await axiosInstance.post(
        `/api/network-next/v1/event/register-event/${event._id}`,
        { userId: currentUserId }
      );

      if (response.data.message === "Event Registration successful") {
        setIsRegistered(true);
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
    <div className="max-w-[300px] border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-r from-white via-gray-50 to-white p-5 cursor-pointer flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative rounded-xl overflow-hidden shadow-md">
        <img
          src={event.eventphoto}
          alt={event.title}
          className="w-full h-[180px] object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 font-medium">
            {new Date(event.date).toLocaleDateString()} • {event.time}
          </p>
        </div>
        <h4 className="text-lg font-bold mt-2 text-gray-800">{event.title}</h4>
        <p className="text-sm text-gray-600 mt-1 flex items-center">
          <strong>Speaker:</strong> {event.speaker}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {event.tagsTopic.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-600 py-1 px-3 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition duration-300"
            onClick={handleLike}
          >
            <img src={arrowBlockUp} alt="Thumbs Up" />
            <span>{event.likes.length}</span>
          </button>
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition duration-300"
            onClick={handleDislike}
          >
            <img src={arrowBlockDown} alt="Thumbs Down" />
            <span>{event.dislikes.length}</span>
          </button>
        </div>

        <button
          className={`px-5 py-2 text-white text-sm font-medium rounded-lg shadow-md transition-transform duration-300 ${
            isRegistered
              ? "bg-green-600 hover:bg-green-500"
              : "bg-blue-600 hover:bg-blue-500"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleRegister}
          disabled={isRegistered || loading}
        >
          {loading ? "Registering..." : isRegistered ? "Registered" : "Register"}
        </button>
      </footer>

      {/* Details Button */}
      <button
        className="mt-3 text-blue-600 text-sm font-medium underline hover:text-blue-800"
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate();
        }}
      >
        Click here for more details
      </button>
    </div>
  );
};

export default EventCard;
