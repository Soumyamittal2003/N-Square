import { useState, useEffect } from "react";
import axios from "axios";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

// StoryCard Component
const StoryCard = ({ title, description, createdBy, createdAt, likes, onLikeDislike, currentUserId, storyId, likedBy }) => {
  const [creatorName, setCreatorName] = useState("Loading...");
  const [isLiked, setIsLiked] = useState(false);

  // Check if the current user has liked the story
  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        const response = await axios.get(`/users/${createdBy._id}`);
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

  // Check if current user has liked the story
  useEffect(() => {
    setIsLiked(likedBy.includes(currentUserId));
  }, [likedBy, currentUserId]);

  // Handle like and dislike
  const handleLike = () => {
    const action = isLiked ? "unlike" : "like";
    setIsLiked((prev) => !prev);
    onLikeDislike(storyId, action);
  };

  return (
    <div className="bg-white border shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      {/* Image/Content Section */}
      <div className="mt-4 mb-6">
        <img src={description} alt={title} className="w-full h-48 object-cover rounded-lg" />
      </div>

      {/* Title and Story Info */}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">By {creatorName}</p>
      <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>

      {/* Like and Dislike buttons */}
      <div className="flex justify-between mt-4 p-2 text-sm">
        <div className="flex items-center gap-3">
          <button onClick={handleLike} className="flex gap-1 font-semibold justify-center">
            <img src={arrowBlockUp} alt="Up Arrow" />
            <span>{likes}</span>
          </button>
          <button className="flex gap-1 font-semibold justify-center">
            <img src={arrowBlockdown} alt="Down Arrow" />
            <span>0</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
