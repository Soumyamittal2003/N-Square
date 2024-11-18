
// import badgeWorking from "../../../assets/icons/working.svg";
import contributorsIcon from "../../../assets/icons/contribution.svg";

const ProjectCard = ({ title, description, contributors, creator, image }) => {
  return (
    <div className="w-[1050px] border border-gray-200 rounded-2xl p-2 shadow-lg h-[35%] bg-white mb-4">
      <div className="flex items-start">
      <img loading="lazy" src={image} alt={title} className="object-containself-stretch  rounded-none w-[121px]  p-3" />
        {/* <img src={badgeWorking} alt="Working Badge" className="w-12 h-12" /> */}
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">
            {description}{" "}
            <span className="text-blue-600 font-semibold cursor-pointer ">
              Read More
            </span>
          </p>
          <div className="flex items-center mt-2">
            <img
              src={contributorsIcon}
              alt="Contributors"
              className="w-5 h-5 mr-2"
            />
            <p className="text-sm text-gray-600">{contributors} Contributors</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500 font-semibold">
          Created By - <span className="font-semibold text-gray-500">{creator}</span>
        </p>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm ">
          Request
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
