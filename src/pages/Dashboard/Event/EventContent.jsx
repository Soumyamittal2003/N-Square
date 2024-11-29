import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import EventCard from "./EventCard"; 

const EventContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const tabs = ["All", "Student", "Faculty", "Alma"];

  // Fetch current user from localStorage
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("chat-app-current-user"));
      if (storedUser && storedUser._id) {
        setCurrentUserId(storedUser._id);
      } else {
        console.error("No current user found in localStorage");
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/event/all");
        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle like action
  const handleLikeEvent = async (eventId) => {
    try {
      const response = await axiosInstance.post(`/event/like/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, likes: response.data.likes, dislikes: response.data.dislikes }
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
            ? { ...event, likes: response.data.likes, dislikes: response.data.dislikes }
            : event
        )
      );
    } catch (error) {
      console.error(`Error disliking event ${eventId}:`, error);
    }
  };

  // Filtering logic
  const filteredEvents = events.filter((event) => {
    if (activeTab === "All") return true;
    if (activeTab === "Student") return event.createdBy?.role === "student";
    if (activeTab === "Faculty") return event.createdBy?.role === "faculty";
    if (activeTab === "Alma") return event.createdBy?.role === "alumni";
    return false; 

  });

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (!filteredEvents.length) {
    return <p>No events found for {activeTab}.</p>;
  }

  return (
    <div className="w-[72%]">
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-2 py-1 m-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-full font-semibold ${activeTab === tab ? "text-black font-bold" : "text-gray-500"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              currentUserId={currentUserId}
              onLikeEvent={handleLikeEvent}
              onDislikeEvent={handleDislikeEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventContent;
