import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

// StoryCard Component
const StoryCard = ({
  title,
  storyImage,
  createdBy,
  createdAt,
  likes,
  dislikes,
  onLike,
  onDislike,
  currentUserId,
  storyId,
  likedBy,
  dislikedBy,
}) => {
  const [creatorName, setCreatorName] = useState("Loading...");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  // Fetch creator name based on creator's user ID
  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/${createdBy._id}`);
        if (response.data?.success) {
          const { firstName, lastName } = response.data.data;
          setCreatorName(`${firstName} ${lastName}`);
        }
      } catch (error) {
        console.error("Error fetching creator details:", error);
        setCreatorName("Unknown");
      }
    };

    fetchCreatorDetails();
  }, [createdBy]);

  // Check if the current user has liked or disliked the story
  useEffect(() => {
    setIsLiked(likedBy.includes(currentUserId));
    setIsDisliked(dislikedBy.includes(currentUserId));
  }, [likedBy, dislikedBy, currentUserId]);

  // Handle like
  const handleLike = () => {
    setIsLiked((prev) => !prev);
    onLike(storyId); // Trigger the onLike method passed from InspiringStory
  };

  // Handle dislike
  const handleDislike = () => {
    setIsDisliked((prev) => !prev);
    onDislike(storyId); // Trigger the onDislike method passed from InspiringStory
  };

  return (
    <div className="bg-white border shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      {/* Story Image or Content */}
      <div className="mt-4 mb-6">
        <img
          src={storyImage}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Title and Story Info */}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">By {creatorName}</p>
      <p className="text-xs text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </p>

      {/* Like, Dislike, and Follow buttons */}
      <div className="flex justify-between mt-4 p-2 text-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className="flex gap-1 font-semibold justify-center"
          >
            <img src={arrowBlockUp} alt="Up Arrow" />
            <span>{isLiked ? likes + 1 : likes}</span>
          </button>
          <button
            onClick={handleDislike}
            className="flex gap-1 font-semibold justify-center"
          >
            <img src={arrowBlockdown} alt="Down Arrow" />
            <span>{isDisliked ? dislikes + 1 : dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
