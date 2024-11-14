import HomeContent from "./HomeContent";
import RightSidebar from "./RightSidebar";
// import { useEffect } from "react";

const Home = () => {
  return (
    <>
      <div className="flex min-w-max">
        <HomeContent />
        <RightSidebar />
      </div>
    </>
  );
};

export default Home;
