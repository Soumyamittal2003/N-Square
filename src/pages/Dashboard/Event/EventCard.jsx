import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockDown from "../../../assets/icons/arrow-block-down.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EventCard = ({ event, currentUserId, onLikeEvent, onDislikeEvent }) => {
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
        `/event/register-event/${event._id}`,
        { userId: currentUserId } // Sending the user ID to register the user
      );

      if (response.data.message === true) {
        toast.success("Registered successfully!");
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
      } else {
        toast.error("Failed to Registered");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full max-w-[340px] border rounded-2xl shadow-lg bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 flex flex-col justify-between hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2">
      {/* Event Image */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={event.eventphoto || "https://via.placeholder.com/150"}
          alt={event.title}
          className="w-full h-[180px] object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="mt-4">
        <p className="text-xs text-gray-400">
          {new Date(event.date).toLocaleDateString()} • {event.time}
        </p>
        <h4 className="text-lg font-bold text-gray-800 mt-2">{event.title}</h4>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Speaker:</strong> {event.speaker}
        </p>
        <p className="text-sm text-gray-700 mt-3">
          {event.description?.length > 120
            ? `${event.description.slice(0, 120)}...`
            : event.description || "No description available."}
          <a
            href="#"
            className="text-blue-600 font-medium hover:underline ml-1"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate();
            }}
          >
            Read More
          </a>
        </p>
        <p className="text-xs text-gray-500 mt-3">
          Topics:{" "}
          <span className="text-gray-700 font-medium">
            {event.tagsTopic.join(", ")}
          </span>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex justify-between items-center">
        {/* Left Icons */}
        <div className="flex gap-4">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <img src={arrowBlockUp} alt="like" className="w-6 h-6" />
            <span className="font-semibold">{event.likes.length}</span>
          </button>

          {/* Dislike Button */}
          <button
            onClick={handleDislike}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
          >
            <img src={arrowBlockDown} alt="dislike" className="w-6 h-6" />
            <span className="font-semibold">{event.dislikes.length}</span>
          </button>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className={`px-5 py-2 text-white rounded-xl ${
            isRegistered ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
          disabled={isRegistered || loading}
        >
          {loading ? "Registering..." : isRegistered ? "Registered" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
