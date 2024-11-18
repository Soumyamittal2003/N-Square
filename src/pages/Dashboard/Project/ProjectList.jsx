import { useState } from "react";
import ProjectCard from './ProjectCard';



  

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Alumni", "Faculty", "Student"];
    const projects = [
        {
          title: "E-Krishak",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
          creator: "Soumya Mittal",
          contributors: 4,
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e"
        },
        {
          title: "E-Krishak",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
          creator: "Soumya Mittal",
          contributors: 4,
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e"
        },
        {
          title: "E-Krishak",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
          creator: "Soumya Mittal",
          contributors: 4,
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e"
        }
      ];
    
      return (
        <div className="w-80%">
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4 ">
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
        <div className="flex gap-5 max-md:flex-col m-5 p-2">
          <div className="flex flex-col w-[95%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full text-black max-md:mt-3 max-md:max-w-full">
              {/* <ProjectFilter /> */}
              <h2 className="mt-0 text-lg font-bold tracking-wide leading-none p-2">Projects</h2>
              <div className="flex flex-col self-stretch mt-3.5 w-full max-md:max-w-full">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
  );
};

export default ProjectList;
