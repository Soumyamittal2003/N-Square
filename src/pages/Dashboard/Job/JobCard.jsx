import bookmark from "../../../assets/icons/bookmark.svg";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";
import shareArrow from "../../../assets/icons/shareArrow.svg";
import jobImage from "../../../assets/icons/job-image.svg";

const JobCard = () => {
  return (
    <div className="w-[350px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 flex flex-col justify-between">
      {/* Job Image */}
      <div className="relative">
        <img
          src={jobImage}
          alt="Job"
          className="w-full h-32 rounded-t-lg object-cover"
        />
      </div>

      {/* Job Details */}
      <div className="mt-4 flex-1">
        <h4 className="text-md font-semibold">Software Engineer Intern</h4>
        <p className="text-sm text-gray-500">
          DocuVille <span className="text-blue-600 font-semibold">India</span><span className="text-green-600 font-semilbold"> Elegibility</span><span className="text-red-600 font-semibold"> Job</span>
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

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4">
        {/* Left Icons */}
        <div className="flex gap-4">
          <button className="w-5 h-5">
            <img src={shareArrow} alt="Share" className="w-full h-full" />
          </button>
          <button className="w-5 h-5">
            <img src={bookmark} alt="Bookmark" className="w-full h-full" />
          </button>
          <button className="flex items-center gap-0">
            <img
              src={arrowBlockUp}
              alt="Up arrow"
              className="w-5 h-5 object-contain"
            />
            <span className="text-sm font-semibold">63K</span>
          </button>
          <button className="flex items-center gap-0">
            <img
              src={arrowBlockdown}
              alt="Down arrow"
              className="w-5 h-5 object-contain"
            />
            <span className="text-sm font-semibold">13K</span>
          </button>
        </div>

        {/* Apply Button */}
        <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-2xl">
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
