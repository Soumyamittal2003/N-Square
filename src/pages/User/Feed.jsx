import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";
import Header from "./Header";
import { useEffect } from "react";

const Feed = () => {
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
        <MainContent />
        <RightSidebar />
      </div>
    </>
  );
};

export default Feed;
