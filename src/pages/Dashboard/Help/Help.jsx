import HelpContent from "./HelpContent";
// import RightSidebar from "./RightSidebar";

const Help = () => {
  return (
    <div className="flex w-full bg-white">
      {/* Main Content Here */}
      <div className="w-[80%] p-2">
        <HelpContent />
      </div>
      {/* <div className="w-[20%] p-2">
        <RightSidebar />
      </div> */}
    </div>
  );
};

export default Help;
