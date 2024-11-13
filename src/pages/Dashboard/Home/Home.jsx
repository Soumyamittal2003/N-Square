import HomeContent from "./HomeContent";
import RightSidebar from "./RightSidebar";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Disable body scrolling

    return () => {
      document.body.classList.remove("overflow-hidden"); // Enable body scrolling when unmounted
    };
  }, []);
  return (
    <>
      <div className="flex w-full">
        <HomeContent />
        <RightSidebar />
      </div>
    </>
  );
};

export default Home;
