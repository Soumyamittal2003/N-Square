import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axiosInstance from "../../../utils/axiosinstance";

const ProjectList = ({ activeTab }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/project/all");
        if (response.data.success) {
          setProjects(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.projectType === activeTab);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (!filteredProjects.length) {
    return <div>No projects found.</div>;
  }

  return (
    <div>
      <div className="flex max-md:flex-col p-2">
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
                creator={
                  project.createdBy?.email || "Unknown" // Safely handle null `createdBy`
                }
                image={
                  project.profilePhoto || "https://via.placeholder.com/150" // Fallback for missing images
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
