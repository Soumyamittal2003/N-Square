import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";
import shareIcon from "../../../assets/icons/shareArrow.svg";

// import badgeIcon from "../../../assets/images/badge.svg";

const EventCard = ({ image, title, speaker, date, time, tags, attending, verified }) => {
  return (
    <div className=" w-[350px] border border-gray-300 rounded-lg shadow-lg bg-white p-4">
      {/* Event Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 rounded-lg object-cover" />
        {/* <img src={badgeIcon} alt="Badge" className="absolute top-2 left-2 w-8 h-8" /> */}
      </div>
      
      {/* Event Details */}
      <div>
      <div className="flex gap-5 justify-between items-start self-center mt-2 w-full">
        <p className="text-sm text-gray-500">{date} • {time}</p>
        
      <button aria-label="Share event" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square">
      <img src={shareIcon} alt="Share" className=" object-contain rounded-none aspect-[0.83] w-[25px]" />
      </button>
      </div>
      
        <h4 className="text-md font-semibold mt-1">{title}</h4>
        <p className="text-sm text-gray-500 flex items-center">
          {speaker} {verified && <span className="text-blue-600 ml-1">✔</span>}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-5 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Attending */}
        <div className="flex flex-1 shrink gap-3 items-center self-stretch mt-1 my-auto basis-10 text-black text-opacity-40 bold">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0c61ecd2b93b8976c1a6041747230e8c6a163e692221e80a09363dd61c27f14?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e" className="object-contain shrink-0 self-stretch my-auto w-3.5 rounded-none aspect-[1.17]" alt="" />
        <div  className="flex-1 shrink self-stretch my-auto basis-0 text-ellipsis">
        {attending.toLocaleString()} 
        </div>
    </div>
      </div>
      

      {/* Register Button */}
      

      {/* Interaction Icons */}
      <footer className="flex gap-5 justify-between items-start self-center mt-2 w-full ">
        <div className="flex items-center gap-3">
          <button className="flex gap-1 items-center font-semibold justify-center">
            <img src={arrowBlockUp}></img>
            <span>63K</span>
          </button>
          <button className="flex gap-1 items-center font-semibold justify-center">
            <img src={arrowBlockdown}></img>
            <span>13K</span>
          </button>
          </div>
          <button className=" overflow-hidden gap-3 self-stretch px-7 py-1.5 my-auto text-white whitespace-nowrap w-60% bg-blue-600 rounded-xl">
            Register
            </button>
        
        </footer>
      
    </div>
  );
};

export default EventCard;
