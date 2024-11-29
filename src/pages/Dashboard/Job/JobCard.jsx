import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import bookmark from "../../../assets/icons/bookmark.svg";
import bookmarked from "../../../assets/icons/bookmarked.svg";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

const JobCard = ({
  job,
  currentUserId,
  onLikePost,
  onDislikePost,
  onBookmarkJob,
  bookmarks,
}) => {
  const {
    _id,
    title = "Job Title",
    company = "Unknown Company",
    location = "Unknown Location",
    description = "No description available.",
    jobphoto,
    skills = [],
    type = "Full-time",
    stipendOrSalary = "Not specified",
    applyLink,
    createdBy = {},
    postedDate,
    likes = [], // Default to empty array if undefined
    dislikes = [], // Default to empty array if undefined
  } = job;

  const [creatorName, setCreatorName] = useState("Loading...");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if the current user has liked or disliked the job
  const isLiked = likes.includes(currentUserId);
  const isDisliked = dislikes.includes(currentUserId);

  // Fetch creator's name dynamically
  useEffect(() => {
    if (createdBy?.firstName && createdBy?.lastName) {
      setCreatorName(`${createdBy.firstName} ${createdBy.lastName}`);
    } else if (createdBy?._id) {
      const fetchCreatorDetails = async () => {
        try {
          const response = await axiosInstance.get(`/users/${createdBy._id}`);
          if (response.data?.success) {
            const { firstName, lastName } = response.data.data;
            setCreatorName(`${firstName} ${lastName}`);
          } else {
            setCreatorName("Unknown");
          }
        } catch (error) {
          console.error(`Error fetching creator details for job ${_id}:`, error);
          setCreatorName("Error fetching user");
        }
      };
      fetchCreatorDetails();
    } else {
      setCreatorName("Unknown");
    }
  }, [createdBy, _id]);

  // Bookmark state management
  useEffect(() => {
    setIsBookmarked(bookmarks.includes(_id));
  }, [bookmarks, _id]);

  const handleBookmarkToggle = () => {
    onBookmarkJob(_id); // Toggle bookmark state
  };

  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true); // Mark the job as applied
  };

  return (
    <div className="w-full max-w-[320px] border border-gray-300 rounded-lg shadow-lg bg-white p-4 flex flex-col justify-between overflow-auto hide-scrollbar">
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
          {/* Bookmark Button */}
          <button onClick={handleBookmarkToggle} className="w-5 h-5 mt-1.5">
            <img
              src={isBookmarked ? bookmarked : bookmark}
              alt="Bookmark"
              className="w-full h-full"
            />
          </button>

          {/* Like Button */}
          <button
            onClick={() => onLikePost(_id)}
            className={`flex items-center gap-1 font-semibold ${
              isLiked ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500 transition`}
          >
            <img src={arrowBlockUp} alt="Upvote" className="w-6 h-6" />
            <span className="font-semibold text-xl">{likes.length}</span>
          </button>

          {/* Dislike Button */}
          <button
            onClick={() => onDislikePost(_id)}
            className={`flex items-center gap-1 font-semibold ${
              isDisliked ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500 transition`}
          >
            <img src={arrowBlockdown} alt="Downvote" className="w-6 h-6" />
            <span className="font-semibold text-xl">{dislikes.length}</span>
          </button>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyClick}
          className={`px-4 py-2 text-sm font-bold text-white rounded-2xl ${
            isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
