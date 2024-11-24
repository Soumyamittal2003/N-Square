
import ReunionCard from "./ReunionCard";
import ReunionVideo from "./ReunionVideo";

const ReunionContent = () => {
  return (
    <div>
      {/* Reunion Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8  border-gray-200">
        <ReunionCard
          title="Reunion Party"
          name="Batman"
          batch="2025"
          date="24 Nov 2023"
          organizer="Soumya Mittal"
          status="Online"
        />
        <ReunionCard
          title="Reunion Party"
          name="Batman"
          batch="2025"
          date="24 Nov 2023"
          organizer="Soumya Mittal"
          status="Online"
        />
        <ReunionCard
          title="Reunion Party"
          name="Batman"
          batch="2025"
          date="24 Nov 2023"
          organizer="Soumya Mittal"
          status="Online"
        />
        <ReunionCard
          title="Reunion Party"
          name="Batman"
          batch="2025"
          date="24 Nov 2023"
          organizer="Soumya Mittal"
          status="Online"
        />
      </div>

      {/* Important Updates Section */}
      {/* <h2 className="text-xl font-bold mb-4">Important Updates</h2>
      <div className="mb-8">
        <ReunionCard
          title="Reunion Party"
          name="Batman"
          batch="2025"
          date="24 Nov 2023"
          organizer="Soumya Mittal"
          status="Online"
        />
      </div> */}

      {/* Previous Reunion Videos Section */}
      <h2 className="text-xl font-bold mb-4">Previous Reunion Videos</h2>
      {/* Video Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ReunionVideo />
        <ReunionVideo />
        <ReunionVideo />
      </div>
    </div>
  );
};

export default ReunionContent;
