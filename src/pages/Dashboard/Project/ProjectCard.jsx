import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const {
    createdBy,
    projectTopic: title,
    description,
    profilePhoto: image,
    _id, // The project ID to navigate to the AboutProject page
  } = project;

  const [creatorName, setCreatorName] = useState("Loading...");

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        if (createdBy) {
          const userId = createdBy._id;
          const response = await axiosInstance.get(`/users/${userId}`);
          if (response.data?.success) {
            const { firstName, lastName } = response.data.data;
            setCreatorName(`${firstName} ${lastName}`);
          } else {
            setCreatorName("Unknown");
          }
        }
      } catch (error) {
        console.error("Error fetching creator details:", error);
        setCreatorName("Error fetching user");
      }
    };

    fetchCreatorDetails();
  }, [createdBy]);

  return (
    <div
      className="border p-2 m-2 border-gray-300 rounded-lg shadow-md bg-white cursor-pointer"
      onClick={() => navigate(`/${_id}`)} // Navigate to AboutProject with project ID
    >
      {/* Header Section */}
      <div className="flex justify-between items-center p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {title || "E-Krishak"}
        </h3>
        <button className="text-black border font-extrabold rounded-lg border-black p-2 hover:text-gray-700 text-sm ">
          Request
          <span className="border-2 m-1 px-1.5 text-xl font-extrabold border-black rounded-full">
            +
          </span>
        </button>
      </div>

      {/* Body Section */}
      <div className="flex items-start px-4 pb-4">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title || "Project Image"}
          className="h-32 w-32 rounded-full"
        />
        <div className="ml-4 flex-1">
          <p className="text-sm pr-6 text-gray-700 items-center">
            {description ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
            <a href="#" className="text-blue-500 font-medium">
              {" "}
              Read More
            </a>
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center p-4">
        <p className="text-sm text-gray-500 font-medium">
          Created By -{" "}
          <span className="text-gray-700 font-semibold">{creatorName}</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
