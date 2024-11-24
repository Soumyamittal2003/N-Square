const RightSidebar = () => {
  return (
    <div className="w-1/3 mt-4 bg-white px-4">
      {/* Upcoming Events Section */}
      <div className="border p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Upcoming Events</h3>
          <button className="text-blue-600 font-semibold text-sm hover:underline">
            Explore All
          </button>
        </div>

        {/* Event Cards */}
        <div className="grid gap-2 mt-2">
          {[1, 2].map((event, index) => (
            <div
              key={index}
              className="grid grid-cols-[80px_1fr] gap-4 items-center  p-1"
            >
              <img
                src="https://via.placeholder.com/80"
                alt="Event Thumbnail"
                className="rounded-md w-20 h-20 object-cover"
              />
              <div>
                <p className="text-sm font-semibold line-clamp-2">
                  Investing Live: Opportunities and Risk Management
                  #investingtips #live #riskmanagement
                </p>
                <div className="flex justify-between mt-3">
                  <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                    Share
                  </button>
                  <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Profiles Section */}
      <div className=" px-4 py-2 rounded-lg  mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Suggested Profiles</h3>
          <button className="text-blue-600 font-semibold text-sm hover:underline">
            View All
          </button>
        </div>

        {/* Profile Cards */}
        <div className="grid gap-4 mt-2">
          {[1, 2, 3].map((profile, index) => (
            <div
              key={index}
              className="grid grid-cols-[50px_1fr] gap-2 border shadow-sm items-center rounded-lg px-4 py-2 "
            >
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-md">Lauy Rahil</h4>
                  <button className="  text-black font-bold px-2  border border-black items-center justify-center rounded-full text-base hover:bg-black hover:text-white transition">
                    <span className="text-lg">+</span> Follow
                  </button>
                </div>
                <p className="text-sm text-gray-500  line-clamp-2">
                  A passionate trader and content creator collaborating with the
                  community.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
