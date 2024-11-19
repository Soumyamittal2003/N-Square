import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ activeTab }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://n-square.onrender.com/api/network-next/v1/project/all"
        );
        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on the active tab
  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.projectType === activeTab);

  return (
    <div>
      {/* Project cards */}
      <div className="flex  max-md:flex-col  p-2 ">
        <div className="flex flex-col w-[95%] max-md:ml-0 max-md:w-full">
          <h2 className="mt-0 text-lg font-bold tracking-wide leading-none p-2">
            Projects
          </h2>

          <div className="flex flex-col self-stretch h-[calc(100vh-50px)] overflow-y-auto hide-scrollbar mt-3.5 w-full max-md:max-w-full">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.projectTopic}
                description={project.description}
                contributors={
                  project.openForStudent ? "Open for Students" : "Closed"
                }
                creator={project.createdBy || "Unknown"}
                image={
                  project.profilePhoto || "https://via.placeholder.com/150"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
