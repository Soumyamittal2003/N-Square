const RightSidebar = () => {
    return (
      
      <div className="w-1/3 mt-6 mb-auto bg-white px-10  rounded-lg p-11">
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
              <div key={index} className=" p-2 rounded-lg my-2  flex">
                <img
                  src="https://via.placeholder.com/60"
                  alt="Event Thumbnail"
                  className="rounded-md w-28 h-24"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold">
                    Investing Live: Opportunities and Risk Management
                    #investingtips 
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