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
    _id,
    mentorContributors,
    studentContributors,
  } = project;

  const [creatorName, setCreatorName] = useState("Loading...");

  useEffect(() => {
    if (createdBy?.firstName && createdBy?.lastName) {
      setCreatorName(`${createdBy.firstName} ${createdBy.lastName}`);
    } else if (createdBy?._id) {
      const fetchCreatorDetails = async () => {
        try {
          const response = await axiosInstance.get(`/users/${createdBy._id}`);
          if (response.data?.success) {
            const { firstName, lastName } = response.data.data;
            setCreatorName(`${firstName} ${lastName}`);
          } else {
            setCreatorName("Unknown");
          }
        } catch (error) {
          console.error("Error fetching creator details:", error);
          setCreatorName("Error fetching user");
        }
      };
      fetchCreatorDetails();
    }
  }, [createdBy]);

  const handleNavigate = () => navigate(`${_id}`);

  return (
    <div
      className="relative border p-4 m-2 border-gray-300 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg"
      onClick={handleNavigate}
    >
      {/* Request Button */}
      <button className="absolute top-4 right-4 px-2 py-1 outline text-gray-500 font-semibold rounded-md hover:bg-black hover:text-white">
        Request
      </button>

      {/* Image and Content */}
      <div className="flex">
        <div>
          <img
            src={image || "https://via.placeholder.com/150"}
            alt={`Image for project: ${title || "E-Krishak"}`}
            className="h-24 w-24 m-3  rounded-full"
          />
          <h2 className=" text-center  text-sm">
            +{mentorContributors.length + studentContributors.length}{" "}
            contributor
          </h2>
        </div>
        <div className="flex flex-col ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {title || "E-Krishak"}
          </h3>
          <p className="text-sm text-black mt-2">
            {description?.length > 100
              ? `${description.slice(0, 100)}...`
              : description || "Lorem Ipsum is simply dummy text..."}
            <a href="#" className="text-blue-500 font-medium">
              {" "}
              Read More
            </a>
          </p>
        </div>
      </div>

      {/* Created By */}
      <div className="absolute bottom-4 right-4">
        <p className="text-sm text-gray-500 font-medium underline">
          Created By -{" "}
          <span className="text-gray-700 font-semibold">{creatorName}</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
