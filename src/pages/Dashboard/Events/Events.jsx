import Sidebar from "../Common/Sidebar";
import EventContent from "./EventContent";
import Header from "../Common/Header";
import { useEffect } from "react";

const Event = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Disable body scrolling

    return () => {
      document.body.classList.remove("overflow-hidden"); // Enable body scrolling when unmounted
    };
  }, []);
  return (
    <>
      <Header />
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar />
        <EventContent />
      </div>
    </>
  );
};

export default Event;
