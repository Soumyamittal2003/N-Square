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

  // const handleSelectChange = (e) => {
  //   onSelectEvent(event._id, e.target.checked);
  // };

  return (
    <div className="w-[290px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 cursor-pointer flex flex-col justify-between">
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.eventphoto}
          alt={event.title}
          className="w-45 h-30 rounded-lg object-cover"
        />
      </div>

      {/* Event Details */}
      <div>
        <div className="flex gap-3 justify-between items-start self-center mt-2 w-full">
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()} • {event.time}
          </p>
        </div>
        <h4 className="text-md font-semibold mt-1">{event.title}</h4>
        <p className="text-sm text-gray-500 flex items-center">
          {event.speaker}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-5 mt-2">
          {event.tagsTopic.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer with Register Button and Like/Dislike Buttons */}
      <footer className="flex justify-between items-center mt-4 w-full">
        <div className="flex gap-3 items-center">
          <button
            className="flex gap-1 items-center font-semibold justify-center"
            onClick={handleLike}
          >
            <img src={arrowBlockUp} alt="Thumbs Up" />
            <span>{event.likes.length}</span>
          </button>
          <button
            className="flex gap-1 items-center font-semibold justify-center"
            onClick={handleDislike}
          >
            <img src={arrowBlockDown} alt="Thumbs Down" />
            <span>{event.dislikes.length}</span>
          </button>
        </div>
        <button
          className="px-7 py-1.5 text-white bg-green-600 rounded-lg"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation from like/dislike click
            handleNavigate();
          }}
        >
          Registered
        </button>
      </footer>

      {/* Checkbox for selecting the event */}
      {/* <div className="mt-2 flex justify-start items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelectChange}
          className="mr-2"
        />
        <label>Select this event</label>
      </div> */}
    </div>
  );
};

export default MyEventCard;
