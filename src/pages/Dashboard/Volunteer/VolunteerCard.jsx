 // Update with the correct path to your icon

const VolunteerCard = ({
  positionTitle,
  skills,
  availablePositions,
  rolesResponsibility,
  eligibility,
  eventTitle,
  venue,
  link,
  date,
  time,
  eventCoordinator,
  coordinatorPhone,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between">
      {/* Main Content */}
      <div>
        <p className="font-bold text-lg mb-2">
          <strong>Event : </strong> {eventTitle}
          <h3 className="font-bold text-lg mb-2">
            <strong>Position : </strong>
            {positionTitle}
          </h3>
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Venue:</strong> {venue || "Online"}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Link:</strong>{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Time:</strong> {time}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Coordinator:</strong> {eventCoordinator}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Phone:</strong> {coordinatorPhone}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Skills:</strong> {skills}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Available Positions:</strong> {availablePositions}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Roles & Responsibilities:</strong> {rolesResponsibility}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Eligibility:</strong> {eligibility}
        </p>
      </div>

      {/* Footer with Apply and Share */}
      <div className="flex justify-center items-center mt-2">
        {/* Share Icon */}
        

        {/* Apply Button */}
        <button className="px-12 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Apply
        </button>
      </div>
    </div>
  );
};

export default VolunteerCard;
