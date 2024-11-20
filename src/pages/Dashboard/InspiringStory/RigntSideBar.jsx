

const RightSidebar = () => {
  return (
    <div className="w-full p-4 space-y-6 bg-gray-50">
      {/* Create Story Button */}
      <div className="flex justify-center">
        <button className="px-6 py-2 text-black border border-black rounded-full hover:bg-black hover:text-white">
          Create Story
        </button>
      </div>

      {/* Trending Stories Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Trending Stories</h2>
        <div className="flex space-x-4 mt-4">
          {/* Story Card 1 */}
          <div className="w-32 h-48 bg-white shadow-md rounded-lg overflow-hidden relative">
            <img
              src="https://via.placeholder.com/150"
              alt="Story Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <button className="text-white text-2xl">
                <i className="fas fa-play"></i>
              </button>
            </div>
          </div>

          {/* Story Card 2 */}
          <div className="w-32 h-48 bg-white shadow-md rounded-lg overflow-hidden relative">
            <img
              src="https://via.placeholder.com/150"
              alt="Story Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <button className="text-white text-2xl">
                <i className="fas fa-play"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
