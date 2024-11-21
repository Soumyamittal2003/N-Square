import ResourceCard from "./ResourceCard";

const ResourceContent = () => {
  const resources = new Array(10).fill({
    title: "Learn C++ Programing With DSA Skils",
    location: "India",
    uploader: "Batman",
    fileType: "PDF",
  });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Find Alma Resources"
          className="p-2 border border-gray-300 rounded-lg w-2/3"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourceContent;