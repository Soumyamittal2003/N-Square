import { useNavigate } from "react-router-dom";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

const EventCard = ({ event, currentUserId, onLikeEvent, onDislikeEvent }) => {
  const { image, title, speaker, date, time, tags, attending, link, likes, dislikes, _id } = event;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/event/about-event`, {
      state: {
        image,
        title,
        speaker,
        date,
        time,
        tags,
        attending,
        link,
      },
    });
  };
  const isLiked = likes.includes(currentUserId);
  const isDisliked = dislikes.includes(currentUserId);

  return (
    <div
      className="w-full max-w-[290px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 cursor-pointer flex flex-col justify-between"
      onClick={handleNavigate}
    >
      <div className="relative">
        <img src={image || "/default-image.jpg"} alt={title} className="w-full h-40 rounded-lg object-cover" />
      </div>
      <div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">{date} • {time}</p>
        </div>
        <h4 className="text-md font-semibold mt-1">{title}</h4>
        <p className="text-sm text-gray-500">{speaker}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500">{link}</div>
        <div className="mt-2 text-sm text-gray-500">{attending}</div>
      </div>
      <footer className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
        <button
            onClick={() => onLikeEvent(_id)}
            className={`flex items-center gap-1 font-semibold  ${
              isLiked ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500 transition`}
          >
            <img src={arrowBlockUp} alt="Upvote" className="w-6 h-6" />
            <span className="font-semibold text-xl">{likes.length}</span>
          </button>
          <button
            onClick={() => onDislikeEvent(_id)}
            className={`flex items-center gap-1 font-semibold ${
              isDisliked ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500 transition`}
          >
            <img src={arrowBlockdown} alt="Downvote" className="w-6 h-6" />
            <span className="font-semibold text-xl">{dislikes.length}</span>
          </button>
        </div>
        <button
          className="px-4 py-1 text-white bg-blue-600 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
        >
          Register
        </button>
      </footer>
    </div>
  );
};

export default EventCard;
