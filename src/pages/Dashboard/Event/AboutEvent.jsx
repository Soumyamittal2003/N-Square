import { useState } from "react";
import { useLocation } from "react-router-dom";
import CreateVolunteering from "./CreateVolunteering"; // Import the modal component

const AboutEvent = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Check if the event details are missing
  if (!title) {
    return <div className="text-center mt-10">Event details not found!</div>;
  }

  return (
    <div className="flex justify-center p-8 overflow-auto hide-scrollbar">
      {/* Event Content */}
      <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full p-6 overflow-auto hide-scrollbar">
        {/* Event Image */}
        <img
          src={eventphoto}
          className="w-full h-[300px] object-cover rounded-lg"
          alt={title}
        />

        {/* Event Date and Time */}
        <p className="mt-2 text-gray-500">
          {new Date(date).toLocaleDateString()} {time}
        </p>

        {/* Event Title */}
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>

        {/* Speaker Info */}
        <p className="text-blue-600 text-sm font-medium">{speaker}</p>

        {/* Event Description */}
        <p className="mt-4 text-gray-800">
          Join us for an engaging session on <b>{title}</b> with {speaker}.
          Learn from the best in the industry and gain valuable insights into
          the world of trading.
        </p>

        {/* Tags */}
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

        {/* Registration and Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.open(link, "_blank")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl w-full sm:w-auto"
          >
            Register for the event
          </button>

          <button
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="px-6 py-2 bg-blue-600 text-white rounded-xl w-full sm:w-auto"
          >
            Create Volunteer Position
          </button>
        </div>

        {/* Attending Information */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Attendees</h3>
          <p className="text-sm text-gray-600">
            Total Attending: {attending?.length || 0}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">Event ID: {_id}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          
            <CreateVolunteering
              onClose={() => setIsModalOpen(false)} // Pass close handler
            />
          </div>
        
      )}
    </div>
  );
};

export default AboutEvent;
