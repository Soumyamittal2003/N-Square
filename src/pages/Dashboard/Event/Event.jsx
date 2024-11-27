import EventContent from "../Event/EventContent";
import RightSidebar from "../Event/RightSidebar";

const Event = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen overflow-y-auto">
      <EventContent />
      <RightSidebar />
    </div>
  );
};

export default Event;
