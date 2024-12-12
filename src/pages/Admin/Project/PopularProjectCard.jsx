import { useState, useEffect } from "react";
import axios from "axios";

const PopularProjectCard = () => {
  const [popularProjects, setPopularProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch Popular Projects from the API
  useEffect(() => {
    const fetchPopularProjects = async () => {
      try {
        const response = await axios.get(
          "/project/popular-projects"
        );

        // Assuming the API response contains a 'projects' array with required fields
        if (response.data && response.data.projects) {
          const projects = response.data.projects.map((project) => ({
            id: project._id,
            title: project.title,
            contributors: project.contributors || 0,
            image: project.image || "https://via.placeholder.com/150", // Fallback image
          }));

          console.log("Popular projects fetched successfully:", projects);
          setPopularProjects(projects);
        } else {
          console.warn("No popular projects found.");
        }
      } catch (error) {
        console.error("Error fetching popular projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchPopularProjects();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col text-gray-800">
      <h2 className="self-start mt-6 text-2xl font-bold text-gray-800 mb-4">
        Popular Projects
      </h2>

      {loadingProjects ? (
        <p className="text-gray-500 text-center mt-4">Loading...</p>
      ) : popularProjects.length > 0 ? (
        popularProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col md:flex-row items-center md:items-stretch bg-white shadow-lg hover:shadow-2xl transition-shadow rounded-xl border border-gray-200 overflow-hidden mb-6"
          >
            {/* Project Image */}
            <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Project Details */}
            <div className="flex flex-col p-4 md:p-6 flex-grow">
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
              <div className="flex items-center mt-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/360478af2e11a65ef64ea0a1f4449e2fc431d304538dfb727a8958a10ee3b561?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e"
                  alt="Contributors"
                  className="w-6 h-6"
                />
                <p className="text-sm text-gray-600 ml-2">
                  +{project.contributors} Contributor{project.contributors > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* View Project Button */}
            <div className="flex items-center justify-center p-4 md:p-6 bg-gray-100 md:bg-transparent">
              <button className="px-6 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
                View Project
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No popular projects found.</p>
      )}
    </div>
  );
};

export default PopularProjectCard;
