import { useNavigate } from "react-router-dom";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockDown from "../../../assets/icons/arrow-block-down.svg";

const EventCard = ({ event, onLikeEvent, onDislikeEvent }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/event/about-event`, {
      state: { ...event },
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

  return (
    <div className="max-w-[300px] border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-r from-white via-gray-50 to-white p-5 cursor-pointer flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={event.eventphoto}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Event Details */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          📅 {new Date(event.date).toLocaleDateString()} • ⏰ {event.time}
        </p>
        <h4 className="text-lg font-bold text-gray-800 mt-2">{event.title}</h4>
        <p className="text-sm text-gray-600 mt-1">
          <strong>🎤 Speaker:</strong> {event.speaker}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {event.tagsTopic.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-blue-600 py-1 px-3 rounded-full shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 flex justify-between items-center">
        <div className="flex gap-3">
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-green-600"
            onClick={handleLike}
          >
            <img
              src={arrowBlockUp}
              alt="Like"
              className="w-5 h-5 transition-transform duration-300 hover:scale-110"
            />
            <span>{event.likes.length}</span>
          </button>
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-red-600"
            onClick={handleDislike}
          >
            <img
              src={arrowBlockDown}
              alt="Dislike"
              className="w-5 h-5 transition-transform duration-300 hover:scale-110"
            />
            <span>{event.dislikes.length}</span>
          </button>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-blue-500 transition-transform duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
        >
          View Details
        </button>
      </footer>
    </div>
  );
};

export default EventCard;
