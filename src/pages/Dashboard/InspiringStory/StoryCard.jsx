import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import arrowBlockUp from "../../../assets/icons/arrow-block-up.svg";
import arrowBlockdown from "../../../assets/icons/arrow-block-down.svg";

const StoryCard = ({ story, currentUserId, onLike, onDislike }) => {
  const {
    _id,
    title = "Untitled Story",
    storyImage,
    createdBy,
    createdAt,
    likes = [],
    dislikes = [],
  } = story;

  const [creatorName, setCreatorName] = useState("Loading...");
  const isLiked = likes.includes(currentUserId);
  const isDisliked = dislikes.includes(currentUserId);

  // Fetch creator name based on creator's user ID
  useEffect(() => {
    const fetchCreatorDetails = async () => {
      if (!createdBy) {
        setCreatorName("Unknown Creator");
        return;
      }

      try {
        const response = await axiosInstance.get(`/users/${createdBy._id}`);
        if (response.data?.success) {
          const { firstName, lastName } = response.data.data;
          setCreatorName(`${firstName} ${lastName}`);
        } else {
          setCreatorName("Unknown Creator");
        }
      } catch (error) {
        console.error("Error fetching creator details:", error);
        setCreatorName("Unknown Creator");
      }
    };

    fetchCreatorDetails();
  }, [createdBy]);

  return (
    <div className="bg-white border shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      {/* Story Image */}
      <div className="mt-4 mb-6">
        <img
          src={storyImage || "https://via.placeholder.com/150"}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Story Details */}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">By {creatorName}</p>
      <p className="text-xs text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </p>

      {/* Like and Dislike Buttons */}
      <div className="flex justify-between mt-4 p-2 text-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onLike(_id)}
            className={`flex gap-1 font-semibold justify-center ${
              isLiked ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <img src={arrowBlockUp} alt="Like" />
            <span>{likes.length}</span>
          </button>
          <button
            onClick={() => onDislike(_id)}
            className={`flex gap-1 font-semibold justify-center ${
              isDisliked ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <img src={arrowBlockdown} alt="Dislike" />
            <span>{dislikes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
