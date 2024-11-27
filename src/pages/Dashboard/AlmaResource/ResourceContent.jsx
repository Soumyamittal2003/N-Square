import { useState } from "react";
import ResourceCard from "./ResourceCard";
import CreateResources from "./CreateResource";

const ResourceContent = () => {
  const [isCreateResourceOpen, setIsCreateResourceOpen] = useState(false);

  const handleOpenCreateResource = () => {
    setIsCreateResourceOpen(true);
  };

  const handleCloseCreateResource = () => {
    setIsCreateResourceOpen(false);
  };

  // Dummy data for resources (you can replace this with actual data)
  const resources = new Array(10).fill({
    title: "Learn C++ Programming With DSA Skills",
    location: "India",
    uploader: "Unknown",
    fileType: "PDF",
  });

  return (
    <div className="p-4">
      {/* Search bar and create button */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Find Alma Resources"
          className="p-2 border border-gray-300 rounded-lg w-2/3 md:w-1/2 lg:w-1/3"
        />
        <button
          onClick={handleOpenCreateResource}
          className="px-4 py-2 text-black border border-black rounded-full hover:bg-black hover:text-white"
        >
          Create Resource
        </button>
      </div>

      {/* Scrollable container for resource cards */}
      <div className="overflow-y-auto hide-scrollbar h-[calc(100vh-120px)]"> {/* Adjust the height for scrollability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>

      {/* Popup for CreateResources */}
      {isCreateResourceOpen && (
        <CreateResources onClose={handleCloseCreateResource} />
      )}
    </div>
  );
};

export default ResourceContent;
