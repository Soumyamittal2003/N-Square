import { useState } from "react";
import CreateEvent from "./CreateEvent";

const RightSidebar = () => {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  const handleOpenCreateEvent = () => {
    setIsCreateEventOpen(true);
  };

  const handleCloseCreateEvent = () => {
    setIsCreateEventOpen(false);
  };

  return (
    <div className="relative w-1/3 mt-2 mb-auto bg-white px-2 rounded-lg p-11">
      {/* Create Event Button Positioned Top Right */}
      <div className="absolute top-2 right-8">
        <button
          onClick={handleOpenCreateEvent}
          className="px-4 py-2 text-black border border-black rounded-full hover:bg-black hover:text-white"
        >
          Create Event
        </button>
      </div>

      {/* Create Event Popup */}
      {isCreateEventOpen && <CreateEvent onClose={handleCloseCreateEvent} />}

      <div className="mt-16 mb-0 p-2"> {/* Adjust spacing below the button */}
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
            <div key={index} className="p-2 rounded-lg my-2 flex">
              <img
                src="https://via.placeholder.com/60"
                alt="Event Thumbnail"
                className="rounded-md w-28 h-24"
              />
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold">
                  Investing Live: Opportunities and Risk Management #investingtips
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
    </div>
  );
};

export default RightSidebar;
