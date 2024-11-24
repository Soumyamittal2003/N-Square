import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { TbCoinRupee } from "react-icons/tb";
import axiosInstance from "../../../utils/axiosinstance"; // Ensure axiosInstance is properly configured

const ProjectDetail = () => {
  const { projectId } = useParams(); // Get project ID from URL params
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("About");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axiosInstance.get(`/project/${projectId}`);
        setProjectData(response.data);
      } catch (err) {
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  const tabContent = {
    About: <p>{projectData?.description || "No description available."}</p>,
    "Mentor/Contributor": (
      <div>
        <h3 className="text-lg font-bold">Mentorship & Collaboration</h3>
        <p>
          {projectData?.openForMentor
            ? "This project is open for mentorship."
            : "Mentorship is not open for this project."}
        </p>
        <p>
          {projectData?.openForStudent
            ? "This project is open for student collaboration."
            : "Student collaboration is not open for this project."}
        </p>
      </div>
    ),
    Eligibility: (
      <div>
        <h3 className="text-lg font-bold">Eligibility Criteria</h3>
        <p className="mt-2">
          {projectData?.eligibility || "No eligibility criteria available."}
        </p>
      </div>
    ),
    "Project Source": (
      <div>
        <h3 className="text-lg font-bold">Project Links</h3>
        {projectData?.projectLinks ? (
          Object.entries(projectData.projectLinks).map(([key, value]) => (
            <div key={key} className="mt-2">
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {key}
              </a>
            </div>
          ))
        ) : (
          <p>No project links available.</p>
        )}
      </div>
    ),
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard/project" className="self-center mr-3">
              <IoChevronBackOutline />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Project Description
            </h1>
          </div>

          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-black text-black font-semibold text-sm rounded-lg hover:bg-black hover:text-white">
              Participate as Contributor
            </button>
            <div className="justify-center items-center flex">
              <button>
                <TbCoinRupee className="h-10 w-10 rounded-lg bg-yellow-500 text-white font-semibold" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex mt-8">
          {/* Left Section: Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src={
                  projectData?.profilePhoto || "https://via.placeholder.com/100"
                }
                alt="Project Icon"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Right Section: Project Description */}
          <div className="ml-6">
            <h2 className="text-xl flex font-bold text-gray-800">
              {projectData?.projectTopic || "Untitled Project"}
              {projectData?.fundingRequired && (
                <span className="ml-4 p-1 px-2 bg-green-500 flex justify-center items-center text-white font-semibold text-sm rounded-lg shadow ">
                  <BsStars className="mr-1" />
                  Open For Funding
                </span>
              )}
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Department: {projectData?.department || "Unknown Department"}
            </p>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Phase: {projectData?.projectPhase || "Unknown Phase"}
            </p>
          </div>
        </div>

        {/* Tab Section */}
        <div className="mt-8">
          <div className="flex space-x-6 border-b border-gray-300 pb-2">
            {[
              "About",
              "Mentor/Contributor",
              "Eligibility",
              "Project Source",
            ].map((tab) => (
              <button
                key={tab}
                className={`font-semibold pb-2 ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4">{tabContent[activeTab]}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
