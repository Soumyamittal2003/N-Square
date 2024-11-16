<<<<<<< HEAD
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
=======


import bookmark from "../../../assets/icons/bookmark.svg";

import shareArrow from "../../../assets/icons/shareArrow.svg";
import jobImage from "../../../assets/icons/job-image.svg";

const JobCard = () => {
  return (
    <div className="w-[300px] border border-gray-300 rounded-lg shadow-sm bg-white p-4">
      {/* Job Image with Badge */}
      <div className="relative">
        <img src={jobImage} alt="Job" className="w-full h-32 rounded-t-lg object-cover" />
        
      </div>

      {/* Job Details */}
      <div className="mt-4">
        <h4 className="text-md font-semibold">Software Engineer Intern</h4>
        <p className="text-sm text-gray-500">DocuVille <span className="text-blue-600">India</span></p>
        <p className="text-sm text-gray-600 mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry standard dummy text ever since the 1500s.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Posted By - <span className="font-semibold">Aadarsh</span>
        </p>
      </div>

      {/* Apply Button */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
        Apply
      </button>

      {/* Interaction Icons */}
      <div className="flex justify-between items-center mt-4 text-gray-400 text-lg">
        <button className="hover:text-gray-600">
          <img src={shareArrow} alt="Share" className="w-5 h-5" />
        </button>
        <button className="hover:text-gray-600">
          <img src={bookmark} alt="Bookmark" className="w-5 h-5" />
        </button>
>>>>>>> 11c7f707884f50935898eb8e0eab9fac9d48492f
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default JobCard;
=======
export default JobCard;
>>>>>>> 11c7f707884f50935898eb8e0eab9fac9d48492f
