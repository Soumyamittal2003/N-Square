import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axiosInstance from "../../../utils/axiosinstance";

const ProjectList = ({ activeTab }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesFetched, setRolesFetched] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All"); // State for additional filter selection
  // const [userTechnologies, setUserTechnologies] = useState([]); // To store user's familiar technologies

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

  // Fetch the user's familiar technologies
  // useEffect(() => {
  //   const fetchUserTechnologies = async () => {
  //     try {
  //       // Example response for now
  //       const response = {
  //         data: { success: true, data: ["React", "Node.js", "MongoDB"] },
  //       };
  //       if (response.data.success) {
  //         setUserTechnologies(response.data.data); // Assume this is an array of 7 technologies
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user technologies:", error);
  //     }
  //   };

  //   fetchUserTechnologies();
  // }, []);

  // Fetch roles dynamically for each project's creator (existing functionality)
  useEffect(() => {
    const fetchRolesForProjects = async () => {
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          if (project.createdBy && !project.createdBy.role) {
            // Only fetch role if not already present
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

  // Filtering logic based on technologies
  // const filteredProjects = projects.filter((project) => {
  //   if (activeTab === "All" && selectedFilter === "All") return true;
  //   if (activeTab === "Student" && project.createdBy?.role === "student")
  //     return true;
  //   if (activeTab === "Faculty" && project.createdBy?.role === "faculty")
  //     return true;
  //   if (activeTab === "Alumni" && project.createdBy?.role === "alumni")
  //     return true;

  // Filter based on selected technologies
  //   if (selectedFilter.startsWith("Tech") && userTechnologies.length) {
  //     const projectTechnologies = project.technologies || [];

  //     // If the filter is for a specific technology (like "Tech1"), compare the project's technologies
  //     const isTechMatch = projectTechnologies.some((tech) =>
  //       userTechnologies.includes(tech)
  //     );

  //     return isTechMatch;
  //   }

  //   return false;
  // });

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  // if (!filteredProjects.length) {
  //   return <div>No projects found for this filter.</div>;
  // }

  return (
    <div>
      <div className="flex max-md:flex-col p-6">
        {/* Tabs and filter buttons */}
        <div className="flex flex-col w-[95%] max-md:ml-0 max-md:w-full">
          {/* Filter options (just below the tabs) */}
          <div className="flex gap-3">
            <button
              className={`${
                selectedFilter === "All"
                  ? "bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("All")}
            >
              For You
            </button>
            <button
              className={`${
                selectedFilter === "Tech1"
                  ? "bg-bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("Tech1")}
            >
              Tech1
            </button>
            <button
              className={`${
                selectedFilter === "Tech2"
                  ? "bg-bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("Tech2")}
            >
              Tech2
            </button>
            <button
              className={`${
                selectedFilter === "Tech3"
                  ? "bg-bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("Tech2")}
            >
              Tech3
            </button>
            <button
              className={`${
                selectedFilter === "Tech4"
                  ? "bg-bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("Tech2")}
            >
              Tech4
            </button>
            <button
              className={`${
                selectedFilter === "Tech5"
                  ? "bg-bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("Tech2")}
            >
              Tech5
            </button>
            <button
              className={`${
                selectedFilter === "Tech6"
                  ? "bg-bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("Tech2")}
            >
              Tech6
            </button>
            <button
              className={`${
                selectedFilter === "Tech7"
                  ? "bg-bg-[#252525] text-white" // Active state
                  : "bg-gray-200 text-gray-800 hover:bg-[#252525] hover:text-white"
              } px-4 py-1 rounded-lg transition-colors duration-300`}
              onClick={() => handleFilterChange("Tech2")}
            >
              Tech7
            </button>
          </div>
          <h2 className="mt-0 text-2xl font-bold tracking-wide leading-none p-2">
            Projects
          </h2>

          <div className=" flex flex-col self-stretch h-[calc(100vh-225px)] overflow-y-auto hide-scrollbar mt-3.5 w-full max-md:max-w-full">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
