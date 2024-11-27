import { useNavigate } from "react-router-dom";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";
import shareIcon from "../../../assets/icons/shareArrow.svg";

const EventCard = ({ image, title, speaker, date, time, tags, attending, link }) => {
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

  return (
    <div
      className="w-full max-w-[290px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 cursor-pointer flex flex-col justify-between"
      onClick={handleNavigate}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 rounded-lg object-cover" />
      </div>
      <div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">{date} • {time}</p>
          <button aria-label="Share event">
            <img src={shareIcon} alt="Share" className="w-5 h-5" />
          </button>
        </div>
        <h4 className="text-md font-semibold mt-1">{title}</h4>
        <p className="text-sm text-gray-500">{speaker}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500">{link}</div>
        <div className="mt-2 text-sm text-gray-500">{attending}</div>
      </div>
      <footer className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button className="flex items-center text-gray-700">
            <img src={arrowBlockUp} alt="Thumbs Up" />
            <span>63K</span>
          </button>
          <button className="flex items-center text-gray-700">
            <img src={arrowBlockdown} alt="Thumbs Down" />
            <span>13K</span>
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
