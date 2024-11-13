const RightSidebar = () => {
  return (
    <div className="w-1/4 mt-12 mb-auto bg-white px-8  rounded-lg">
      <div className="mb-6">
        {/* Upcoming Events Section */}
        <div className="border p-2 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg mx-2">Upcoming Events</h3>
            <button className="text-black mx-2 font-semibold text-sm">
              Explore All
            </button>
          </div>

          {/* Event Card */}

          {[1, 2].map((event, index) => (
            <div key={index} className=" p-4 rounded-lg my-2  flex">
              <img
                src="https://via.placeholder.com/60"
                alt="Event Thumbnail"
                className="rounded-md w-28 h-24"
              />
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold">
                  Investing Live: Opportunities and Risk Management
                  #investingtips #live #riskmanagement
                </p>
                <div className="flex justify-evenly mx-auto mt-2">
                  <button className="bg-[#1F6BFF] text-white font-semibold px-4 mx-4 w-1/2 py-1 rounded-lg text-sm">
                    Share
                  </button>
                  <button className="bg-[#1F6BFF] text-white font-semibold px-4 mx-4 w-1/2 py-1 rounded-lg text-sm">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Suggested Profiles Section */}
        <div className="flex justify-between items-center ">
          <h3 className="font-bold text-lg mx-2">Suggested Profiles</h3>
          <button className="text-black mx-2  text-sm font-semibold">
            View All
          </button>
        </div>

        {/* Profile Card */}
        {[1, 2, 3].map((profile, index) => (
          <div
            key={index}
            className="flex border border-gray-300 shadow-md  items-center my-4 bg-white p-4 rounded-2xl"
          >
            <img
              src="https://via.placeholder.com/45"
              alt="Profile"
              className="rounded-full w-3/12"
            />
            <div className="ml-3  ">
              <div className="flex justify-between items-center  ">
                <h4 className="font-bold  text-lg">Lauy Rahil</h4>
                <button className="text-black border-2 border-black font-bold py-1.5 px-3 rounded-3xl text-md">
                  <span className="text-xl">+</span> Follow
                </button>
              </div>
              <p className="text-sm my-2  text-gray-500">
                A passionate trader and content creator collaborating with the
                community.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
