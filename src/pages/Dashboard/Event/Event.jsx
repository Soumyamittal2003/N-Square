import EventContent from "../Event/EventContent";
import RightSidebar from "../Event/RightSidebar";
const Event = () => {
  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">
        <EventContent />
        <RightSidebar />
      </div>
    </>
  );
};

export default Event;
