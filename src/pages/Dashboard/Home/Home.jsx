import HomeContent from "./HomeContent";
import RightSidebar from "./RightSidebar";

const Home = () => {
  return (
    <>
      <div className="flex w-screen">
        <HomeContent />
        <RightSidebar />
      </div>
    </>
  );
};

export default Home;
