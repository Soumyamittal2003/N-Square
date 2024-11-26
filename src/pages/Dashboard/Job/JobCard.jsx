import { useState } from "react";
import bookmark from "../../../assets/icons/bookmark.svg";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

const JobCard = ({ job, createdByData }) => {
  const {
    title,
    company,
    location,
    description,
    jobphoto,
    skills,
    type,
    stipendOrSalary,
    applyLink,
    createdBy,  // ID of the creator
    postedDate,
  } = job;

  const [isApplied, setIsApplied] = useState(false);

  // If createdByData exists, use it to get the name; otherwise, fallback to "Unknown"
  const createdByName = createdByData ? createdByData.name : "Unknown";

  const handleApplyClick = () => {
    setIsApplied(true); // This marks the job as applied
  };

  return (
    <div className="w-full max-w-[320px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 flex flex-col justify-between">
      {/* Job Image */}
      <div className="relative">
        <img
          src={jobphoto || "https://via.placeholder.com/150"}
          alt={title || "Job Image"}
          className="w-full h-[180px] rounded-t-lg object-cover"
        />
      </div>

      {/* Job Details */}
      <div className="mt-4 flex-1">
        <h4 className="text-md font-semibold">{title || "Job Title"}</h4>
        <p className="text-sm text-gray-500">
          {company || "Company"}{" "}
          <span className="text-blue-600 font-semibold">
            {location || "Location"}
          </span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {description || "No description available."}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Skills:{" "}
          <span className="text-gray-800 font-medium">
            {skills ? skills.join(", ") : "None specified"}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Type: <span className="text-blue-800 font-medium">{type}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Salary/Stipend:{" "}
          <span className="text-green-800 font-medium">{stipendOrSalary}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Created By:{" "}
          <span className="text-gray-800 font-medium">
            {createdByName}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Created Date:{" "}
          <span className="text-gray-800 font-medium">
            {new Date(postedDate).toLocaleDateString()}
          </span>
        </p>

        {/* Apply Link */}
        <p className="text-xs text-gray-500 mt-2">
          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Apply Here
          </a>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4">
        {/* Left Icons */}
        <div className="flex gap-4">
          <button className="w-5 h-5">
            <img src={bookmark} alt="Bookmark" className="w-full h-full" />
          </button>
          <button className="flex items-center gap-1">
            <img
              src={arrowBlockUp}
              alt="Up arrow"
              className="w-5 h-5 object-contain"
            />
            <span className="text-sm font-semibold">63K</span>
          </button>
          <button className="flex items-center gap-1">
            <img
              src={arrowBlockdown}
              alt="Down arrow"
              className="w-5 h-5 object-contain"
            />
            <span className="text-sm font-semibold">13K</span>
          </button>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyClick}
          className={`px-4 py-2 text-sm font-bold text-white rounded-2xl ${
            isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isApplied}
        >
          {isApplied ? 'Applied' : 'Apply'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
