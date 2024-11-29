import { useState } from "react";
import ProjectList from "./ProjectList";
import PopularProjectCard from "./PopularProjectCard";
import { Link } from "react-router-dom";

const Project = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Faculty", "Alumni", "Student"];

  const NavBar = () => (
    <div className="flex border border-gray-300 justify-between w-7/12 bg-white rounded-2xl shadow-lg px-4 py-1 mt-4 ">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-sm px-4 py-2 rounded-full font-semibold ${
            activeTab === tab ? "text-black font-bold" : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
  return (
    <div className=" ">
      <div className="flex justify-between items-center">
        <NavBar />
        <Link to={"create-project"}>
          <div className=" px-4 py-2 mx-5 self-end cursor-pointer  text-lg font-semibold tracking-normal leading-none text-black rounded-2xl border-2 border-black max-md:mr-2 hover:text-white hover:bg-black">
            Create Project
          </div>
        </Link>
      </div>
      <div className="flex justify-center">
        {/* Main Content */}
        <div className=" p-3 w-[65%]">
          <ProjectList activeTab={activeTab} />
        </div>

        {/* Sidebar: Popular Projects */}
        <div className="p-3 flex  w-[35%]">
          <PopularProjectCard />
        </div>
      </div>
    </div>
  );
};

export default Project;
