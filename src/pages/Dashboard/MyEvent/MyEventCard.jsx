import { useNavigate } from "react-router-dom";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockDown from "../../../assets/icons/arrow-block-down.svg";

const MyEventCard = ({
  event,
  currentUserId,
  onLikeEvent,
  onDislikeEvent,
  onSelectEvent,
  isSelected,
}) => {
  const navigate = useNavigate();

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

  const handleSelectChange = (e) => {
    onSelectEvent(event._id, e.target.checked);
  };

  return (
    <div className="w-[320px] border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-br from-white via-gray-50 to-blue-100 p-6 hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between">
      {/* Event Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={event.eventphoto}
          alt={event.title}
          className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
  
      {/* Event Details */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 flex items-center">
          📅 {new Date(event.date).toLocaleDateString()} • ⏰ {event.time}
        </p>
        <h4 className="text-xl font-semibold text-gray-800 mt-2">{event.title}</h4>
        <p className="text-sm text-gray-600 mt-1">🎤 {event.speaker}</p>
  
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {event.tagsTopic.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-200 text-blue-700 py-1 px-3 rounded-full font-medium shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
  
      {/* Footer with Register Button and Like/Dislike Buttons */}
      <footer className="flex justify-between items-center mt-6">
        <div className="flex gap-3 items-center">
          <button
            className="flex gap-2 items-center font-semibold text-gray-600 hover:text-green-600 transition-colors"
            onClick={handleLike}
          >
            <img
              src={arrowBlockUp}
              alt="Thumbs Up"
              className="w-5 h-5 transition-transform duration-200 hover:scale-110"
            />
            <span>{event.likes.length}</span>
          </button>
          <button
            className="flex gap-2 items-center font-semibold text-gray-600 hover:text-red-600 transition-colors"
            onClick={handleDislike}
          >
            <img
              src={arrowBlockDown}
              alt="Thumbs Down"
              className="w-5 h-5 transition-transform duration-200 hover:scale-110"
            />
            <span>{event.dislikes.length}</span>
          </button>
        </div>
        <button
          className="px-6 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation from like/dislike click
            handleNavigate();
          }}
        >
          Register
        </button>
      </footer>
  
      {/* Checkbox for selecting the event */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelectChange}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label className="text-gray-600">Select this event</label>
      </div>
    </div>
  );
  
};

export default MyEventCard;
