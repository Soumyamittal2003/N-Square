import { useState } from "react";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";
import bookmark from "../../../assets/icons/bookmark.svg";
import comment from "../../../assets/icons/comment.svg";
import shareArrow from "../../../assets/icons/shareArrow.svg";

const PostCard = ({ text = "", images = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const openImageModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  // Function to split text into hashtags and regular text
  const parseTextWithHashtags = (text) => {
    return text.split(/(#[a-zA-Z0-9_]+)/g).map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <span key={index} className="text-blue-600 font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Truncated text for preview, checking if text exists
  const truncatedText = text
    ? text.slice(0, 150) + (text.length > 150 ? "..." : "")
    : "";

  return (
    <div className="bg-white m-6 p-4 w-5/6 mx-auto rounded-lg shadow mb-4 border border-gray-200">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Author"
            className="rounded-full w-10 h-10"
          />
          <div className="ml-3">
            <div className="flex items-center">
              <h4 className="font-semibold">Lauy Rahil</h4>
              <button className="ml-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Follow
              </button>
            </div>
            <p className="text-sm text-gray-500">Studied at Trading Strategy</p>
          </div>
        </div>
        <div className="flex self-start text-gray-500">
          <p className="text-sm">2 hours ago</p>
          <button className="ml-3 text-gray-900 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <p className="text-sm mx-2 text-gray-800 mt-2">
        {isExpanded
          ? parseTextWithHashtags(text)
          : parseTextWithHashtags(truncatedText)}
        {text.length > 150 && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 font-bold cursor-pointer ml-1"
          >
            ({isExpanded ? "Less" : "More"})
          </span>
        )}
      </p>

      {/* Uploaded Images Section */}
      {images.length > 0 && (
        <div
          className={`mt-4 grid gap-2 ${
            images.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-2"
          }`}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Uploaded ${index + 1}`}
              onClick={() => openImageModal(image)}
              className=" aspect-video rounded-lg object-scale-down cursor-pointer"
            />
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 text-white text-2xl"
            >
              &times;
            </button>
            <img
              src={currentImage}
              alt="Full Size"
              className="max-w-full max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Interaction Section */}
      <div className="flex justify-between mt-4 p-2 text-sm ">
        <div className="flex items-center gap-3">
          <button className="flex gap-1 font-semibold justify-center">
            <img src={arrowBlockUp}></img>
            <span>63K</span>
          </button>
          <button className="flex gap-1 font-semibold justify-center">
            <img src={arrowBlockdown}></img>
            <span>13K</span>
          </button>
          <button className="flex gap-1 font-semibold justify-center">
            <img src={comment}></img>
            <span>13K</span>
          </button>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button className="flex font-semibold">
            <img src={shareArrow}></img>
          </button>
          <button className="flex font-semibold">
            <img src={bookmark}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
