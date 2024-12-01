import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../utils/axiosinstance";
import CreateVolunteering from "./CreateVolunteering"; // Import the modal component

const AboutEvent = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null); // State for current user ID
  const [isEventCreator, setIsEventCreator] = useState(false); // State for event ownership

  const {
    _id,
    title,
    eventphoto,
    speaker,
    date,
    time,
    tagsTopic,
    link,
    attending,
  } = location.state || {};

  // Fetch current user ID from local storage
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      const storedUser = JSON.parse(localStorage.getItem("chat-app-current-user"));
      if (storedUser && storedUser._id) {
        setCurrentUserId(storedUser._id);
      } else {
        console.error("No current user found in localStorage");
      }
    };

    fetchCurrentUserId();
  }, []);

  // Verify if the current user is the event creator
  useEffect(() => {
    const checkEventCreator = async () => {
      try {
        if (currentUserId && _id) {
          const response = await axiosInstance.get(
            `/event/user/${currentUserId}`
          );
          const userEvents = response.data.events;

          const userCreatedEvent = userEvents.some((event) => event._id === _id);
          setIsEventCreator(userCreatedEvent);
        }
      } catch (error) {
        console.error("Error verifying event creator:", error.response || error);
      }
    };

    checkEventCreator();
  }, [currentUserId, _id]);

  // Check if the event details are missing
  if (!title) {
    return <div className="text-center mt-10">Event details not found!</div>;
  }

  return (
    <div className="flex justify-center p-8 overflow-auto hide-scrollbar">
      <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full p-6 overflow-auto hide-scrollbar">
        <img
          src={eventphoto}
          className="w-full h-[300px] object-cover rounded-lg"
          alt={title}
        />

        <p className="mt-2 text-gray-500">
          {new Date(date).toLocaleDateString()} {time}
        </p>

        <h1 className="mt-4 text-2xl font-bold">{title}</h1>

        <p className="text-blue-600 text-sm font-medium">{speaker}</p>

        <p className="mt-4 text-gray-800">
          Join us for an engaging session on <b>{title}</b> with {speaker}.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          {tagsTopic?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.open(link, "_blank")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl w-full sm:w-auto"
          >
            Register for the event
          </button>

          {isEventCreator && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl w-full sm:w-auto"
            >
              Create Volunteer Position
            </button>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Attendees</h3>
          <p className="text-sm text-gray-600">
            Total Attending: {attending?.length || 0}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateVolunteering
            eventId={_id} // Pass event ID as a prop
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AboutEvent;
