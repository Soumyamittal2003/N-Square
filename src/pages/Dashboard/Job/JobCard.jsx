import bookmark from "../../../assets/icons/bookmark.svg";

import shareArrow from "../../../assets/icons/shareArrow.svg";
import jobImage from "../../../assets/icons/job-image.svg";

const JobCard = () => {
  return (
    <div className="w-[350px] border border-gray-300 rounded-lg shadow-lg bg-white p-4">
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
          Posted By - <span className="self-end leading-none">Aadarsh</span>
        </p>
      </div>

      {/* Apply Button */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
        Apply
      </button>

      {/* Interaction Icons */}
      <div className="flex gap-4 items-center">
        <button className="flex gap-1.5 items-start self-stretch py-1.5 my-auto w-[18px]">
          <img src={shareArrow} alt="Share" className="object-contain rounded-sm aspect-square w-[18px]" />
        </button>
        <button className="flex gap-2.5 items-start self-stretch py-1.5 my-auto w-[15px]">
          <img src={bookmark} alt="Bookmark" className="object-contain rounded-none aspect-[0.83] w-[15px]" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
