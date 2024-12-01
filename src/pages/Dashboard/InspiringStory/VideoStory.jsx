const VideoStory = ({ videoSrc }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-60">
      <div className="relative h-40">
        {/* Thumbnail */}
        <video
          src={videoSrc}
          className="w-full h-[250px] object-cover"
          poster="https://via.placeholder.com/150" // Placeholder image for the video
          controls={false} // Hide controls for simplicity in UI
        >
          Your browser does not support the video tag.
        </video>
        {/* Play Button */}
        <button className="absolute inset-0 flex items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white bg-black bg-opacity-100 rounded-full p-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoStory;
