import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axiosInstance from "../../../utils/axiosinstance";

const ProjectList = ({ activeTab }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesFetched, setRolesFetched] = useState(false);

  // Fetch all projects
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

  // Fetch roles dynamically for each project's creator
  useEffect(() => {
    const fetchRolesForProjects = async () => {
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          if (project.createdBy) {
            try {
              const response = await axiosInstance.get(
                `/users/${project.createdBy._id}`
              );
              return {
                ...project,
                createdBy: {
                  ...project.createdBy,
                  role: response.data.data.role,
                },
              };
            } catch (error) {
              console.error(
                `Failed to fetch role for project ${project._id}:`,
                error
              );
              return project; // Fallback to original project
            }
          }
          return project; // If no creator, return the project as-is
        })
      );

      setProjects(updatedProjects);
      setRolesFetched(true); // Mark roles as fetched
    };

    if (projects.length && !rolesFetched) {
      fetchRolesForProjects();
    }
  }, [projects, rolesFetched]);

  // Filtering logic
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    if (activeTab === "Student") return project.createdBy?.role === "student";
    if (activeTab === "Faculty") return project.createdBy?.role === "faculty";
    if (activeTab === "Alma") return project.createdBy?.role === "alumni";
    return false; // Default case
  });

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
          <div className="flex flex-col self-stretch h-[calc(100vh-225px)] overflow-y-auto hide-scrollbar mt-3.5 w-full max-md:max-w-full">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
