const VolunteerCard = ({ position, onApply }) => {
  const {
    _id: positionId,
    positionTitle,
    skills,
    availablePositions,
    rolesResponsibility,
    eligibility,
    eventDetails,
    applied,
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
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      {/* Main Content */}
      <div className="space-y-3">
        <h2 className="font-extrabold text-xl text-blue-700 mb-2">
          Event: {eventTitle}
        </h2>
        <h3 className="font-bold text-lg text-gray-800">
          Position: {positionTitle}
        </h3>
        <div className="text-sm space-y-1 text-gray-600">
          <p>
            <strong>Venue:</strong> {venue || "Online"}
          </p>
          <p>
            <strong>Link:</strong>{" "}
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                {link}
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <p>
            <strong>Date:</strong> {new Date(date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Coordinator:</strong> {eventCoordinator}
          </p>
          <p>
            <strong>Phone:</strong> {coordinatorphone}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            <span className="text-gray-800">{skills || "N/A"}</span>
          </p>
          <p>
            <strong>Available Positions:</strong>{" "}
            <span className="text-gray-800">{availablePositions}</span>
          </p>
          <p>
            <strong>Roles & Responsibilities:</strong> {rolesResponsibility}
          </p>
          <p>
            <strong>Eligibility:</strong> {eligibility}
          </p>
        </div>
      </div>

      {/* Footer with Apply Button */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => onApply(positionId)}
          className={`px-12 py-3 text-lg font-semibold rounded-full shadow-md transition-colors duration-300 ${
            applied
              ? "bg-gray-400 text-gray-100 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
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
