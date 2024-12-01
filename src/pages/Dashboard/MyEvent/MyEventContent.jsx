import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import EventCard from "./MyEventCard";
import { useNavigate } from "react-router-dom";

const MyEventContent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event

  const navigate = useNavigate();

  // Fetch current user from localStorage
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedUser = JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      if (storedUser && storedUser._id) {
        setCurrentUserId(storedUser._id);
      } else {
        console.error("No current user found in localStorage");
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch registered events for the current user
  useEffect(() => {
    const fetchUserAndEvents = async () => {
      try {
        const userResponse = await axiosInstance.get(`/users/${currentUserId}`);
        const registeredEventIds = userResponse.data.data.registeredEvent;

        // Fetch event data for each registered event
        const eventPromises = registeredEventIds.map((eventId) =>
          axiosInstance.get(`/event/${eventId}`)
        );
        const eventResponses = await Promise.all(eventPromises);

        const fetchedEvents = eventResponses.map(
          (response) => response.data.event
        );
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching user or events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchUserAndEvents();
    }
  }, [currentUserId]);

  // Handle like action
  const handleLikeEvent = async (eventId) => {
    try {
      const response = await axiosInstance.post(`/event/like/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? {
                ...event,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
              }
            : event
        )
      );
    } catch (error) {
      console.error(`Error liking event ${eventId}:`, error);
    }
  };

  // Handle dislike action
  const handleDislikeEvent = async (eventId) => {
    try {
      const response = await axiosInstance.post(`/event/dislike/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? {
                ...event,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
              }
            : event
        )
      );
    } catch (error) {
      console.error(`Error disliking event ${eventId}:`, error);
    }
  };

  // Handle event selection for conditional button display
  const handleSelectEvent = (eventId, isSelected) => {
    if (isSelected) {
      setSelectedEvent(events.find((event) => event._id === eventId));
    } else {
      setSelectedEvent(null);
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (!events.length) {
    return <p>No events found.</p>;
  }

  return (
    <div className="w-full flex">
      {/* Event Cards */}
      <div className="w-full">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                currentUserId={currentUserId}
                onLikeEvent={handleLikeEvent}
                onDislikeEvent={handleDislikeEvent}
                onSelectEvent={handleSelectEvent}
                isSelected={selectedEvent?._id === event._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEventContent;
