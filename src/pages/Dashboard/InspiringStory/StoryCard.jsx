// import React from "react";
import { Link } from "react-router-dom";

const StoryCard = ({ story, currentUserId }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Story Title */}
      <h3 className="text-lg font-semibold text-gray-800">{story.title}</h3>

      {/* Story Author */}
      <p className="text-sm text-gray-600">
        By {story.createdBy ? `${story.createdBy.firstName} ${story.createdBy.lastName}` : 'Unknown Author'}
      </p>

      {/* Story Content Preview */}
      <p className="text-sm text-gray-700 mt-2">{story.content?.slice(0, 100)}...</p>

      {/* Link to full story */}
      <Link
        to={`/stories/${story._id}`}
        className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
      >
        Read more
      </Link>
    </div>
  );
};

export default StoryCard;
