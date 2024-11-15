import { FaShareAlt, FaHeart } from "react-icons/fa"; // Using react-icons for icons

const JobCard = ({ title, company, location, description, postedBy }) => {
  return (
    <div className="max-w-sm p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        {/* Company Logo */}
        <img
          src="https://via.placeholder.com/40"
          alt="Company Logo"
          className="w-12 h-12 rounded-full mr-3"
        />

        {/* Title and Company Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">
            {company} <span className="text-gray-400">{location}</span>
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

      {/* Posted By */}
      <div className="mb-4">
        <p className="text-xs text-gray-400">
          Posted by - <span className="font-semibold">{postedBy}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 py-2 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
          Apply
        </button>
        <button className="flex-1 py-2 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors">
          Share
        </button>
      </div>

      {/* Bottom Icons */}
      <div className="flex justify-between items-center mt-4 text-gray-500">
        <FaShareAlt className="cursor-pointer" />
        <FaHeart className="cursor-pointer" />
      </div>
    </div>
  );
};

export default JobCard;
