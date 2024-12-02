//import { useState, useEffect } from "react";
//import axiosInstance from "../../../utils/axiosinstance";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

const AppliedCard = ({ job, currentUserId, creatorName }) => {
  const {
    title = "Job Title",
    company = "Unknown Company",
    location = "Unknown Location",
    description = "No description available.",
    jobphoto,
    skills = [],
    type = "Full-time",
    stipendOrSalary = "Not specified",
    applyLink,
    postedDate,
    likes = [],
    dislikes = [],
  } = job;

  return (
    <div className="w-full max-w-[320px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 flex flex-col justify-between overflow-auto hide-scrollbar ">
      {/* Job Image */}
      <div className="relative">
        <img
          src={jobphoto || "https://via.placeholder.com/150"}
          alt={title}
          className="w-full h-[180px] rounded-t-lg object-cover"
        />
      </div>

      {/* Job Details */}
      <div className="mt-4 flex-1">
        <h4 className="text-md font-semibold">{title}</h4>
        <p className="text-sm text-gray-500">
          {company}{" "}
          <span className="text-blue-600 font-semibold">{location}</span>
        </p>
        <p className="text-sm text-gray-950 mt-2">{description}</p>
        <p className="text-xs text-gray-500 mt-2">
          Skills Required:{" "}
          <span className="text-gray-950 font-medium">
            {skills.length > 0 ? skills.join(", ") : "None specified"}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Type: <span className="text-red-600 font-medium">{type}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Salary/Stipend:{" "}
          <span className="text-green-700 font-medium">{stipendOrSalary}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Created By:{" "}
          <span className="text-gray-800 font-medium">{creatorName}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Created Date:{" "}
          <span className="text-gray-800 font-medium">
            {postedDate ? new Date(postedDate).toLocaleDateString() : "Unknown"}
          </span>
        </p>

        {/* Apply Link */}
        <p className="text-xs text-gray-500 mt-2">
          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-medium hover:underline"
          >
            Apply Through Link
          </a>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4">
        {/* Left Icons */}
        <div className="flex gap-4">
          {/* Like Button (Not needed for applied job view) */}
          <button
            disabled
            className="flex items-center gap-1 font-semibold text-gray-600"
          >
            <img src={arrowBlockUp} alt="Upvote" className="w-6 h-6" />
            <span className="font-semibold text-xl">{likes.length}</span>
          </button>

          {/* Dislike Button (Not needed for applied job view) */}
          <button
            disabled
            className="flex items-center gap-1 font-semibold text-gray-600"
          >
            <img src={arrowBlockdown} alt="Downvote" className="w-6 h-6" />
            <span className="font-semibold text-xl">{dislikes.length}</span>
          </button>
        </div>

        {/* Applied Button */}
        <button
          className="px-6 py-2 text-sm font-bold text-white rounded-lg bg-green-600 cursor-not-allowed"
          disabled
        >
          Applied
        </button>
      </div>
    </div>
  );
};

export default AppliedCard;
