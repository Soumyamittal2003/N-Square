import contributorsIcon from "../../../assets/icons/contribution.svg";

const ProjectCard = ({ title, description, contributors, creator, image }) => {
  return (
    <div className="w-auto border border-gray-200 rounded-2xl p-4 shadow-lg bg-white mb-4">
      <div className="flex items-start">
        {/* Image Section */}
        <img
          loading="lazy"
          src={image || "https://via.placeholder.com/150"}
          alt={title || "Project Image"}
          className="object-contain rounded-md w-[121px] h-[121px] p-3"
        />
        <div className="ml-4 flex-1">
          {/* Project Title */}
          <h3 className="text-lg font-semibold text-gray-900">
            {title || "Untitled Project"}
          </h3>

          {/* Project Description */}
          <p className="text-sm text-gray-600 mt-2">
            {description || "No description available."}{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              Read More
            </span>
          </p>

          {/* Contributors Information */}
          <div className="flex items-center mt-3">
            <img
              src={contributorsIcon}
              alt="Contributors"
              className="w-5 h-5 mr-2"
            />
            <p className="text-sm text-gray-600">{contributors || "Unknown"}</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-4">
        {/* Creator Information */}
        <p className="text-sm text-gray-500 font-semibold">
          Created By:{" "}
          <span className="font-semibold text-gray-700">
            {creator || "Anonymous"}
          </span>
        </p>

        {/* Call to Action */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          Request
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
