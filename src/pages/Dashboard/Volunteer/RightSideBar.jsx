import { useState } from "react";
import CreateVolunteer from "./CreateVolunteer";

const RightSidebar = () => {
  const [isCreateVolunteerOpen, setIsCreateVolunteerOpen] = useState(false);

  const handleOpenCreateVolunteer = () => {
    setIsCreateVolunteerOpen(true);
  };

  const handleCloseCreateVolunteer = () => {
    setIsCreateVolunteerOpen(false);
  };

  return (
    <div className="w-full p-4 space-y-2 bg-white">
      {/* Create Volunteer Button */}
      <div className="flex justify-center">
        <button
          onClick={handleOpenCreateVolunteer}
          className="px-4 py-2 text-black border border-black rounded-full hover:bg-black hover:text-white"
        >
          Create Volunteer
        </button>
      </div>

      {/* Popup for CreateVolunteer */}
      {isCreateVolunteerOpen && (
        <CreateVolunteer onClose={handleCloseCreateVolunteer} />
      )}
    </div>
  );
};

export default RightSidebar;
