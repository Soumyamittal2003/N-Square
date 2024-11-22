
;
import { useLocation } from "react-router-dom";

const AboutEvent = () => {
  const location = useLocation();
  const {
    image,
    title,
    speaker,
    date,
    time,
    tags,
    attending,
    link,
    
  } = location.state || {};

  if (!title) {
    return <div className="text-center mt-10">Event details not found!</div>;
  }

  return (
    <div className="flex justify-center p-8 ">
      {/* Event Content */}
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
        <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg" />
        <p className="mt-2 text-gray-500">{date} {time}</p>
        
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>
        <p className="text-blue-600 text-sm font-medium">{speaker}</p>
        <p className="mt-4 text-gray-800">
          Join us for an engaging session on <b>{title}</b> with {speaker}.
          Learn from the best in the industry and gain valuable insights into the world of trading.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-gray-500">{link} </p>
        <p className="mt-4 text-gray-500">{attending} are attending</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
          Register
        </button>
      </div>
    </div>
  );
};

export default AboutEvent;
