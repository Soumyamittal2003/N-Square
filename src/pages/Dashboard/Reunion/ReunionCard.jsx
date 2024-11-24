const ReunionCard = ({ title, name, batch, date, organizer, status }) => {
    return (
      <div className="h-[170px]  border border-gray-200 shadow-lg rounded-lg p-4 relative flex flex-col">
        {/* Online Status at Top Right */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-sm rounded-md ${
              status === "Online"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
  
        {/* Content Section */}
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src="/path/to/reunion-image-placeholder.png" // Replace with real image or API
              alt="Reunion"
              className="w-16 h-16 rounded-md"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>Name: {name}</p>
            <p>Batch: {batch}</p>
            <p>Date: {date}</p>
            <p>Organized By: {organizer}</p>
          </div>
        </div>
  
        {/* RSVP Button at Bottom Right */}
        <div className="absolute bottom-2 right-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            RSVP
          </button>
        </div>
      </div>
    );
  };
  
  export default ReunionCard;
  