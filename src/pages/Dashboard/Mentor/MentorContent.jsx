import MentorCard from "./Mentorcard";

const MentorContent = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Digital Engagement Programs</h1>
      <p className="text-gray-700 mb-6">
        Run impactful mentorship programs without hassle.
      </p>

      <div className="flex justify-center">
        <img
          src="/path-to-illustration.jpg"
          alt="Mentorship illustration"
          className="max-w-full rounded-lg shadow-md mb-6"
        />
      </div>

      {/* Embedding the MentorCard component */}
      <div className="mt-6">
        <MentorCard
          title="Digital Engagement Programs"
          description="Run impactful mentorship programs without hassle."
          buttonText="Explore More"
        />
      </div>
    </div>
  );
};

export default MentorContent;