import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosinstance";
import { Link } from "react-router-dom";

const AboutProject = () => {
  const { projectId } = useParams(); // Assuming projectId is passed via route
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axiosInstance.get(`/project/${projectId}`);
        if (response.data.success) {
          setProject(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="text-center text-red-500 mt-10">
        Project details could not be loaded.
      </div>
    );
  }

  const {
    projectTopic,
    description,
    status,
    contributors,
    eligibility,
    source,
    createdBy,
  } = project;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{projectTopic}</h1>
          <Link
            to="/project"
            className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700"
          >
            Back to Projects
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Left Section */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Project Description
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              About the Project
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This is a detailed explanation of the project. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry standard dummy text ever since the
              1500s.
            </p>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Eligibility
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {eligibility || "Eligibility information is not available."}
            </p>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Project Source
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {source || "Source details are not available."}
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Project Status
            </h2>
            <p
              className={`text-sm font-medium px-4 py-2 rounded-full ${
                status === "Working"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status}
            </p>

            <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
              Contributors
            </h2>
            <ul className="space-y-2">
              {contributors && contributors.length > 0 ? (
                contributors.map((contributor, index) => (
                  <li
                    key={index}
                    className="text-gray-600 text-sm font-medium flex items-center"
                  >
                    <img
                      src={
                        contributor.profilePhoto ||
                        "https://via.placeholder.com/40"
                      }
                      alt="Contributor"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {contributor.name || "Unknown Contributor"}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No contributors available.</p>
              )}
            </ul>

            <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
              Created By
            </h2>
            <p className="text-gray-600 font-medium">
              {createdBy?.firstName
                ? `${createdBy.firstName} ${createdBy.lastName}`
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
