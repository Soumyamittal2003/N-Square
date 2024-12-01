import shareIcon from "../../../assets/icons/shareArrow.svg"; // Update with the correct path to your icon

const VolunteerCard = ({ functionName, date, time, venue, organizer, contact }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between">
      {/* Main Content */}
      <div>
        <h3 className="font-bold text-lg mb-2">{functionName}</h3>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Date:</strong> {date}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Time:</strong> {time}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Venue:</strong> {venue}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Contact:</strong> {organizer} ({contact})
        </p>
      </div>

      {/* Footer with Apply and Share */}
      <div className="flex justify-between items-center mt-4">
        {/* Apply Button */}
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Apply
        </button>

        {/* Share Icon */}
        <button className="flex items-center justify-center">
          <img
            src={shareIcon}
            alt="Share"
            className="object-contain w-[25px] aspect-square"
          />
        </button>
      </div>
    </div>
  );
};

export default VolunteerCard;
