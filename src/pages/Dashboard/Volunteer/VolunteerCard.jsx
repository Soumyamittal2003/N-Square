const VolunteerCard = ({ position, onApply }) => {
  const {
    _id: positionId,
    positionTitle,
    skills,
    availablePositions,
    rolesResponsibility,
    eligibility,
    eventDetails,
    applied, // Flag to check if already applied
  } = position;

  const {
    title: eventTitle,
    venue,
    link,
    date,
    time,
    eventCoordinator,
    coordinatorphone,
  } = eventDetails || {};

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
          <strong>Phone:</strong> {coordinatorphone}
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

      {/* Footer with Apply Button */}
      <div className="flex justify-center items-center mt-2">
        <button
          onClick={() => onApply(positionId)}
          className={`px-12 py-2 rounded-lg ${
            applied
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default VolunteerCard;
