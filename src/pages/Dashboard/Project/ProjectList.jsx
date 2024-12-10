import { useState, useEffect, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import axiosInstance from "../../../utils/axiosinstance";

const ProjectList = ({ activeTab = "default" }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesFetched, setRolesFetched] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [userSkills, setUserSkills] = useState([]);

  // Fetch user profile to get skills
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        if (response.data.success) {
          const skills = response.data.data.skills || [];
          setUserSkills(skills);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Define filter buttons dynamically based on user skills
  const filters = useMemo(() => {
    return [{ name: "For You", value: "All" }, ...userSkills.map((skill) => ({ name: skill, value: skill }))];
  }, [userSkills]);

  // Fetch all projects
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/project/all");
        if (isMounted && response.data.success) {
          setProjects(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch roles dynamically for each project's creator
  useEffect(() => {
    let isMounted = true;

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

      if (isMounted) {
        setProjects(updatedProjects);
        setRolesFetched(true);
      }
    };

    if (projects.length && !rolesFetched) {
      fetchRolesForProjects();
    }

    return () => {
      isMounted = false;
    };
  }, [projects, rolesFetched]);

  // Filter projects based on the selected filter
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedFilter === "All") return true; // Show all projects
      return project.technologies?.includes(selectedFilter); // Filter by technology
    });
  }, [projects, selectedFilter]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  if (loading) {
    return <div aria-live="polite">Loading projects...</div>;
  }

  if (!filteredProjects.length) {
    return <div>No projects found for this filter.</div>;
  }

  return (
    <section>
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
    </section>
  );
};

export default ProjectList;
