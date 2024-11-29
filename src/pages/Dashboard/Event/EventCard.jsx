
import { useNavigate } from "react-router-dom"; // For navigation to AboutEvent page
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
      className="w-[290px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 cursor-pointer flex flex-col justify-between"
      onClick={handleNavigate}
    >
      {/* Event Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-45 h-30 rounded-lg object-cover" />
      </div>

      {/* Event Details */}
      <div>
        <div className="flex gap-3 justify-between items-start self-center mt-2 w-full">
          <p className="text-sm text-gray-500">{date} • {time}</p>
          <button aria-label="Share event" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square">
            <img src={shareIcon} alt="Share" className="object-contain rounded-none aspect-[0.83] w-[25px]" />
          </button>
        </div>
        <h4 className="text-md font-semibold mt-1">{title}</h4>
        <p className="text-sm text-gray-500 flex items-center">
          {speaker}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-5 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 items-center mt-2 text-sm text-gray-500">
          <span>{link}</span>
        </div>
          
        {/* Attending */}
        <div className="flex gap-3 items-center mt-2 text-sm text-gray-500">
          <span>{attending}</span>
        </div>
      </div>

      {/* Register Button */}
      <footer className="flex justify-between items-start self-center mt-4 w-full">
        <div className="flex items-center gap-3">
          <button className="flex gap-1 items-center font-semibold justify-center">
            <img src={arrowBlockUp} alt="Thumbs Up" />
            <span>63K</span>
          </button>
          <button className="flex gap-1 items-center font-semibold justify-center">
            <img src={arrowBlockdown} alt="Thumbs Down" />
            <span>13K</span>
          </button>
        </div>
        <button
          className="px-7 py-1.5 text-white bg-blue-600 rounded-xl"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation from the card click
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

