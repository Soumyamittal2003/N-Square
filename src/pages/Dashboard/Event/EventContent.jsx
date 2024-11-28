import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import EventCard from './EventCard';
//import { useNavigate } from "react-router-dom";
//import event1 from "../../../assets/images/event-image.jpg"; // Placeholder for event images

const EventContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesFetched, setRolesFetched] = useState(false);
  //const [userBookmarks, setUserBookmarks] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const tabs = ["All", "Alumni", "Faculty", "Student"];
  //const navigate = useNavigate();

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

  // Fetch roles dynamically for each event's creator
  useEffect(() => {
    const fetchCreatorDetails = async () => {
      const updatedEvents = await Promise.all(
        events.map(async (event) => {
          if (event.createdBy) {
            try {
              const response = await axiosInstance.get(`/users/${event.createdBy}`);
              return {
                ...event,
                createdBy: {
                  ...event.createdBy,
                  role: response.data.data.role,
                  firstName: response.data.data.firstName,
                  lastName: response.data.data.lastName,
                },
              };
            } catch (error) {
              console.error(`Failed to fetch creator details for event ${event._id}:`, error);
              return event; // Fallback to original event
            }
          }
          return event; // If no creator, return the event as-is
        })
      );

      setEvents(updatedEvents);
      setRolesFetched(true);
    };

    if (events.length) {
      fetchCreatorDetails();
    }
  }, [events, rolesFetched]);

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

  // Filtering logic
  const filteredEvents = events.filter((event) => {
    if (activeTab === "All") return true;
    if (activeTab === "Alumni") return event.createdBy?.role === "alumni";
    if (activeTab === "Faculty") return event.createdBy?.role === "faculty";
    if (activeTab === "Student") return event.createdBy?.role === "student";
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
      {/* Tabs Section */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-2 py-1 m-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-full font-semibold ${
              activeTab === tab ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events Section */}
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Sessions</h2>
            <button className=" text-sm font-semibold">Explore All</button>
          </div>
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
    </div>
  );
};

export default EventContent;
