import bookmark from "../../../assets/icons/bookmark.svg";

import shareArrow from "../../../assets/icons/shareArrow.svg";
import jobImage from "../../../assets/icons/job-image.svg";

const JobCard = () => {
  return (
    <div className="w-[300px] border border-gray-300 rounded-lg shadow-sm bg-white p-4">
      {/* Job Image with Badge */}
      <div className="relative">
        <img
          src={jobImage}
          alt="Job"
          className="w-full h-32 rounded-t-lg object-cover"
        />
      </div>

      {/* Job Details */}
      <div className="mt-4">
        <h4 className="text-md font-semibold">Software Engineer Intern</h4>
        <p className="text-sm text-gray-500">
          DocuVille <span className="text-blue-600">India</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s.
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
      </div>
    </div>
  );
};

export default JobCard;
