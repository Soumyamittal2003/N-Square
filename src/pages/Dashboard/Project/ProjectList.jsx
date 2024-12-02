import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axiosInstance from "../../../utils/axiosinstance";

const ProjectList = ({ activeTab }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesFetched, setRolesFetched] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Define filter buttons dynamically
  const filters = [
    { name: "For You", value: "All" },
    { name: "Tech1", value: "Tech1" },
    { name: "Tech2", value: "Tech2" },
    { name: "Tech3", value: "Tech3" },
    { name: "Tech4", value: "Tech4" },
    { name: "Tech5", value: "Tech5" },
    { name: "Tech6", value: "Tech6" },
    { name: "Tech7", value: "Tech7" },
  ];

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
          if (project.createdBy && !project.createdBy.role) {
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
              return project;
            }
          }
          return project;
        })
      );
      setProjects(updatedProjects);
      setRolesFetched(true);
    };

    if (projects.length && !rolesFetched) {
      fetchRolesForProjects();
    }
  }, [projects, rolesFetched]);

  // Filter projects based on the selected filter
  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "All") return true; // Show all projects
    return project.technologies?.includes(selectedFilter); // Filter by technology
  });

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (!filteredProjects.length) {
    return <div>No projects found for this filter.</div>;
  }

  return (
    <div>
      <div className="flex w-full items-center justify-center p-4">
        <div className="flex flex-col w-[95%] max-md:ml-0 max-md:w-full">
          {/* Render filter buttons dynamically */}
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`${
                  selectedFilter === filter.value
                    ? "bg-[#252525] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
                } px-4 py-1 rounded-lg transition-colors duration-300`}
                onClick={() => handleFilterChange(filter.value)}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-wide leading-none p-2">
            Projects
          </h2>

          <div className="flex flex-col self-stretch h-[calc(100vh-225px)] overflow-y-auto hide-scrollbar mt-3.5 w-full">
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
