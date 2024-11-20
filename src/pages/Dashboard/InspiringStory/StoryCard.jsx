import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

const StoryCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
        {/* Placeholder for a logo or avatar */}
        <span className="text-white font-bold text-lg">{title.charAt(0)}</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="flex justify-between mt-4 p-2 text-sm ">
        <div className="flex items-center gap-3">
          <button className="flex gap-1 font-semibold justify-center">
            <img src={arrowBlockUp}></img>
            <span>63K</span>
          </button>
          <button className="flex gap-1 font-semibold justify-center">
            <img src={arrowBlockdown}></img>
            <span>13K</span>
          </button>
        <button className="px-4 py-1 ml-2 bg-blue-600 text-white  rounded-full text-xs font-semibold">Follow</button>
      </div>
    </div>
    </div>
  );
};

export default StoryCard;
