import EventContent from "../Event/EventContent";
import RightSidebar from "../Event/RightSidebar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AboutEvent from "./AboutEvent";

const Event = () => {
  return (
    // <Router>
      <div className="flex w-full h-screen overflow-hidden">
        <EventContent />
        <RightSidebar />
      </div>
      /* <Routes>
        <Route path="/about-event" element={<AboutEvent />} />
      </Routes>
    </Router> */
  );
};

export default Event;
