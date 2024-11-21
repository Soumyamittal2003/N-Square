import pdfIcon from "../../../assets/images/pdfIcon.png"; // Path to the PDF icon
import thumbUpIcon from "../../../assets/icons/arrow-block-up.svg"; // Path to the Thumb Up icon
import bookmark from "../../../assets/icons/bookmark.svg"; // Path to the Thumb Down icon
import downloadIcon from "../../../assets/icons/download.svg"; // Path to the Download icon
import shareIcon from "../../../assets/icons/shareArrow.svg"; // Path to the Share icon

const ResourceCard = ({ resource }) => {
  return (
    <div className="w-[300px] h-[300px] bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex flex-col items-center relative">
      {/* Title */}
      <h3 className="font-semibold text-center text-sm mb-2">{resource.title}</h3>
      <p className="text-xs text-gray-500">{resource.location}</p>
      
      {/* PDF Icon */}
      <img src={pdfIcon} alt="PDF Icon" className="w-36 h-36 my-4" />
      
      {/* Uploader Info */}
      <p className="text-xs text-gray-500 mb-2">Uploaded By - {resource.uploader}</p>
      
      {/* Bottom Icons */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
        <img
          src={thumbUpIcon}
          alt="Thumb Up"
          className="w-5 h-5 cursor-pointer hover:opacity-80"
        />
        <span className="text-sm font-semibold mx-0">63K</span>
        <img
          src={downloadIcon}
          alt="Download"
          className="w-5 h-5 cursor-pointer hover:opacity-80 mr-2"
        />
      </div>
      
      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <img
          src={bookmark}
          alt="Bookmark"
          className="w-5 h-5 cursor-pointer hover:opacity-80"
        />
        <img
          src={shareIcon}
          alt="Share"
          className="w-5 h-5 cursor-pointer hover:opacity-80"
        />
      </div>
    </div>
  );
};

export default ResourceCard;
