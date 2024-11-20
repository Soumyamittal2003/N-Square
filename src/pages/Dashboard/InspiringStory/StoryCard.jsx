

const StoryCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
        {/* Placeholder for a logo or avatar */}
        <span className="text-white font-bold text-lg">{title.charAt(0)}</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="flex mt-4 space-x-4">
        <button className="text-gray-500 hover:text-black">
          👍
        </button>
        <button className="text-gray-500 hover:text-black">
          👎
        </button>
        <button className="text-blue-500 hover:text-blue-600">Follow</button>
      </div>
    </div>
  );
};

export default StoryCard;
