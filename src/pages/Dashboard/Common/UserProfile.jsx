import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import { toast } from "react-toastify";
import ProjectCard from "../Project/ProjectCard";
import PostCard from "../Common/PostCard";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState("");
  const [profileimageUrl, setprofileimageUrl] = useState("");
  const [backgroundimageUrl, setbackgroundimageUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [role, setRole] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
  });
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [experience, setExperience] = useState([]);
  const [certificationsAndLicenses, setCertificationsAndLicenses] = useState(
    []
  );
  const [publicationsAndResearch, setPublicationsAndResearch] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingTagLine, setIsEditingTagLine] = useState(false);
  const [isEditingOrganization, setIsEditingOrganization] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [
    isEditingCertificationsAndLicenses,
    setIsEditingCertificationsAndLicenses,
  ] = useState(false);
  const [
    isEditingPublicationsAndResearch,
    setIsEditingPublicationsAndResearch,
  ] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [isEditingBannerImage, setIsEditingBannerImage] = useState(false);

  const [activeTab, setActiveTab] = useState("Posts");

  const [loading, setLoading] = useState(true);

  const tabs = ["Posts", "Projects", "Events", "Job"];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, postsResponse, projectsResponse] =
          await Promise.all([
            axiosInstance.get(`/users/${userId}`),
            axiosInstance.get(`/post/user/${userId}`),
            axiosInstance.get(`/project/user/${userId}`),
          ]);

        const data = userResponse.data.data;
        setUserData(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAbout(data.about);
        setSkills(data.skills);
        setTagLine(data.tagLine);
        setEducation(data.education);
        setRole(data.role);
        setEmail(data.email);
        setOrganization(data.organization);
        setFollowers(data.followers);
        setFollowing(data.following);
        setprofileimageUrl(userData.profileimageUrl || "");
        setbackgroundimageUrl(userData.backgroundimageUrl || "");
        setUserPosts(postsResponse.data || []);
        setUserProjects(projectsResponse.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      }
    };

    fetchUserData();
  }, [userData.backgroundimageUrl, userData.profileimageUrl, userId]);

  // Update About Section
  const updateAbout = async () => {
    try {
      await axiosInstance.put(`/users/update/${userId}`, {
        about,
      });
      toast.success("Profile updated successfully!");
      setIsEditingAbout(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };
  const updateTagLine = async () => {
    try {
      await axiosInstance.put(`/users/update/${userId}`, {
        tagLine,
      });
      toast.success("Tagline updated successfully!");
      setIsEditingTagLine(false);
    } catch (error) {
      console.error("Error updating Tagline:", error);
    }
  };
  const updateOrganization = async () => {
    try {
      await axiosInstance.put(`/users/update/${userId}`, {
        organization,
      });
      toast.success("Organization updated successfully!");
      setIsEditingTagLine(false);
    } catch (error) {
      console.error("Error updating Organization:", error);
    }
  };
  const updateSkills = async () => {
    try {
      console.log(skills);
      await axiosInstance.put(`/users/update/${userId}`, {
        skills,
      });
      toast.success("Skills updated successfully!");
      setIsEditingSkills(false);
    } catch (error) {
      console.error("Error updating skills:", error);
      toast.error("Failed to update skills.");
    }
  };
  const updateEducation = async () => {
    try {
      await axiosInstance.put(`/users/update/${userId}`, {
        education,
      });
      toast.success("Education updated successfully!");
      setIsEditingEducation(false);
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error("Failed to update education.");
    }
  };

  // Handle Input Change for About Section
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "about") {
      setAbout(value);
    } else if (name === "tagLine") {
      setTagLine(value);
    } else if (name === "organization") {
      setOrganization(value);
    } else if (name === "skills") {
      setNewSkill(value);
    }
  };
  const handleEducationInputChange = (field, value) => {
    setNewEducation((prev) => ({
      ...prev,
      [field]: value, // Update the specific field within newEducation
    }));
  };
  const handleAddSkills = () => {
    const enteredSkills = newSkill
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);

    const uniqueSkills = [
      ...new Set([...skills.map((s) => s.skillName), ...enteredSkills]),
    ]
      .slice(0, 7) // Enforce the limit of 7 skills
      .map((skill) => ({ skillName: skill })); // Convert to skill objects

    if (uniqueSkills.length > skills.length) {
      setSkills(uniqueSkills);
      toast.success("Skills added successfully!");
    } else {
      toast.error("No new skills added or limit exceeded!");
    }

    setNewSkill(""); // Clear the input field
  };
  const removeSkill = (skillToRemove) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.skillName !== skillToRemove)
    );
  };
  const handleAddEducation = () => {
    // Validate required fields
    if (
      !newEducation.institution ||
      !newEducation.degree ||
      !newEducation.fieldOfStudy ||
      !newEducation.startDate
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    setEducation((prev) => [...prev, { ...newEducation }]); // Add new entry
    setNewEducation({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
    }); // Reset input fields
    toast.success("Education added successfully!");
  };
  const removeEducation = (index) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };
  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeMB = 2;

    if (!validFileTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG or PNG image.");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(
        `File size exceeds ${maxSizeMB}MB. Please upload a smaller image.`
      );
      return;
    }

    const formData = new FormData();
    formData.append("displayPicture", file);

    try {
      const response = await axiosInstance.patch(
        `/profile/updateProfileImage/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        const updatedImageUrl = URL.createObjectURL(file);
        setprofileimageUrl(updatedImageUrl);
        toast.success("Profile image updated successfully!");
      } else {
        throw new Error(
          response.data.message || "Failed to upload profile image."
        );
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast.error("An error occurred while saving the profile image.");
    }
  };
  const handleBannerImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeMB = 2;

    if (!validFileTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG or PNG image.");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(
        `File size exceeds ${maxSizeMB}MB. Please upload a smaller image.`
      );
      return;
    }

    const formData = new FormData();
    formData.append("displayPicture", file);

    try {
      const response = await axiosInstance.patch(
        `/profile/updateBackgroundImage/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        const updatedBannerUrl = URL.createObjectURL(file);
        setbackgroundimageUrl(updatedBannerUrl);
        toast.success("Banner image updated successfully!");
      } else {
        throw new Error(
          response.data.message || "Failed to upload banner image."
        );
      }
    } catch (error) {
      console.error("Error uploading banner image:", error);
      toast.error("An error occurred while saving the banner image.");
    }
  };
  const getBorderColor = () => {
    switch (role) {
      case "student":
        return "border-yellow-500";
      case "faculty":
        return "border-red-500";
      case "alumni":
        return "border-blue-500";
      default:
        return "border-gray-300";
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading profile...</div>;
  }

  return (
    <div className="flex w-full ">
      {/* Left Section */}
      <div className="w-[60%] p-4 ">
        <div className="flex flex-col items-center">
          {/* Profile Section */}
          <div className="w-[80%] h-80 p-3 bg-white rounded-lg shadow-lg border mx-auto flex flex-col items-center justify-center">
            <div className="relative shadow-md rounded-lg overflow-hidden w-full">
              {/* Banner Image Section */}
              <div className="relative w-full h-60">
                {/* Background Cover Image */}
                <div
                  className="h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${backgroundimageUrl})`, // Use the banner image URL
                  }}
                >
                  {/* Optional Overlay for Dim Effect */}
                  <div className="bg-black bg-opacity-25 w-full h-full"></div>
                </div>

                {/* Edit Button */}
                {!isEditingBannerImage && (
                  <button
                    onClick={() => setIsEditingBannerImage(true)}
                    className="absolute top-2 right-2 bg-white bg-opacity-25 text-white px-2 text-center rounded-full text-md z-30"
                  >
                    <FiEdit className="text-white" />
                  </button>
                )}

                {/* Upload Button */}
                {isEditingBannerImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <label
                      htmlFor="backgroundimageUrl"
                      className="bg-white text-black p-1 rounded-lg font-semibold cursor-pointer"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="backgroundimageUrl"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBannerImageChange} // Combined upload and save handler
                    />
                  </div>
                )}
              </div>

              {/* Profile Image Section */}
              <div className="absolute top-1/2 transform -translate-y-1/2 w-fit mx-auto left-1/2 -translate-x-1/2">
                {/* Profile Image */}
                <div className="relative">
                  {/* Dimmed Background Overlay */}
                  {isEditingProfileImage && (
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex justify-center items-center z-40">
                      <label
                        htmlFor="profileimageUrl"
                        className="bg-white text-black px-2 py-1 rounded-lg font-semibold cursor-pointer"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        id="profileimageUrl"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageChange} // Combined upload and save handler
                      />
                    </div>
                  )}

                  {/* Profile Image */}
                  <img
                    src={profileimageUrl} // Use temp preview if available
                    alt="Profile"
                    className={`rounded-full w-36 h-36 cursor-pointer border-8 ${getBorderColor()} z-10`}
                    onClick={() => setIsEditingProfileImage(true)} // Open editing mode
                  />

                  {/* Edit Button */}
                  {!isEditingProfileImage && (
                    <button
                      onClick={() => setIsEditingProfileImage(true)}
                      className="absolute bottom-2 right-2 bg-white bg-opacity-25 text-black p-2 rounded-full text-md z-50"
                    >
                      <FiEdit className="text-black" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <h1 className=" text-2xl font-bold text-center">
              {firstName} {lastName}
            </h1>

            <div className="flex space-x-6 gap-2 p-1 mt-1 px-4 border rounded-3xl justify-center">
              <div className="text-center">
                <p className="font-bold text-lg">{followers.length}</p>
                <p className="text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{following.length}</p>
                <p className="text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{userPosts.length}</p>
                <p className="text-gray-500">Posts</p>
              </div>
            </div>
          </div>
          {/* Tab Navigation */}
          <div className="flex border justify-around bg-white rounded-2xl shadow-md w-full px-1 py-1 m-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm px-4 py-2 rounded-full font-semibold ${
                  activeTab === tab ? "text-black font-bold" : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="bg-white ">
            {activeTab === "Posts" && (
              <div className="h-[calc(66vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-50">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      user={userData}
                      currentUserId={userId}
                      onLikePost={(postId) =>
                        console.log(`Liked post ${postId}`)
                      }
                      onDislikePost={(postId) =>
                        console.log(`Disliked post ${postId}`)
                      }
                      onFollowUser={(userId) =>
                        console.log(`Followed user ${userId}`)
                      }
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No posts to show.</p>
                )}
              </div>
            )}
            {activeTab === "Projects" && (
              <div className="h-[calc(66-200px)] overflow-y-auto hide-scrollbar">
                {userProjects.length > 0 ? (
                  userProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No projects to show.
                  </p>
                )}
              </div>
            )}
            {activeTab === "Events" && (
              <div className="h-[calc(66-200px)] overflow-y-auto hide-scrollbar">
                {/* Placeholder for events */}
                <p className="text-center text-gray-500">No events to show.</p>
              </div>
            )}
            {activeTab === "Job" && (
              <div className="h-[calc(66vh-200px)] overflow-y-auto hide-scrollbar">
                {/* Placeholder for jobs */}
                <p className="text-center text-gray-500">No jobs to show.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[30%] mx-auto p-4 mt-4 bg-white  ">
        <div className="overflow-y-auto h-[calc(100vh-150px)] hide-scrollbar">
          {/* this is about section */}

          <div className="PersonalInformation p-2 mt-2 border rounded-lg shadow">
            <h1 className="text-lg font-semibold">Personal Information</h1>
            <div className="about relative flex items-center justify-start">
              <h2 className="  mr-2">About-</h2>
              {isEditingAbout ? (
                <textarea
                  name="about"
                  value={about}
                  onChange={handleInputChange}
                  className="w-fit border py-0 h-8 px-2 rounded"
                />
              ) : (
                <p className="text-gray-700">{about}</p>
              )}
              <button
                onClick={
                  isEditingAbout ? updateAbout : () => setIsEditingAbout(true)
                }
                className="absolute top-0 right-0 bg-gray-50 px-2 text-sm py-1 text-black  rounded-md"
              >
                {isEditingAbout ? (
                  <span>Save</span>
                ) : (
                  <FiEdit className="text-black" />
                )}
              </button>
            </div>
            <div className="tagline relative flex items-center justify-start">
              <h2 className="mr-2">Tagline-</h2>
              {isEditingTagLine ? (
                <textarea
                  name="tagLine"
                  value={tagLine}
                  onChange={handleInputChange}
                  className="w-fit border py-0 h-8 px-2 rounded"
                />
              ) : (
                <p className="text-gray-700">{tagLine}</p>
              )}
              <button
                onClick={
                  isEditingTagLine
                    ? updateTagLine
                    : () => setIsEditingTagLine(true)
                }
                className="absolute top-0 right-0 bg-gray-50 px-2 text-sm py-1 text-black  rounded-md"
              >
                {isEditingTagLine ? (
                  <span>Save</span>
                ) : (
                  <FiEdit className="text-black" />
                )}
              </button>
            </div>
            <div className="email relative flex items-center justify-start">
              <h2 className="mr-2">Email-</h2>
              <p className="text-gray-700">{email}</p>
            </div>

            <div className="organization relative flex items-center justify-start">
              <h2 className="  mr-2">Organization-</h2>
              {isEditingOrganization ? (
                <textarea
                  name="organizatoin"
                  value={organization}
                  onChange={handleInputChange}
                  className="w-fit border py-0 h-8 px-2 rounded"
                />
              ) : (
                <p className="text-gray-700">{organization}</p>
              )}
              <button
                onClick={
                  isEditingOrganization
                    ? updateOrganization
                    : () => setIsEditingOrganization(true)
                }
                className="absolute top-0 right-0 bg-gray-50 px-2 text-sm py-1 text-black  rounded-md"
              >
                {isEditingAbout ? (
                  <span>Save</span>
                ) : (
                  <FiEdit className="text-black" />
                )}
              </button>
            </div>
          </div>
          <div className="Skills border p-2 mt-2 rounded-lg shadow">
            <div className="SkillsSection relative mt-6">
              <h1 className="text-lg font-semibold">Skills</h1>
              <div className="skills  flex items-center justify-start">
                {isEditingSkills ? (
                  <>
                    <textarea
                      name="skills"
                      value={newSkill}
                      onChange={handleInputChange}
                      className="w-fit border py-0 h-8 px-2 rounded"
                      placeholder="Enter skills separated by commas"
                    />
                    <button
                      onClick={handleAddSkills}
                      className="ml-2 bg-gray-50 px-2 text-sm py-1 text-black rounded-md"
                    >
                      Add
                    </button>
                  </>
                ) : (
                  <p className="text-gray-700">
                    {skills.length === 0 ? "No skills added" : ""}
                  </p>
                )}
                <button
                  onClick={
                    isEditingSkills
                      ? updateSkills
                      : () => setIsEditingSkills(true)
                  }
                  className="absolute top-0 right-0 bg-gray-50 px-2 text-sm py-1 text-black rounded-md"
                >
                  {isEditingSkills ? (
                    <span>Save</span>
                  ) : (
                    <FiEdit className="text-black" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-sm py-1 px-3 rounded inline-flex items-center"
                >
                  {skill.skillName}
                  {isEditingSkills && (
                    <button
                      onClick={() => removeSkill(skill.skillName)}
                      className="ml-2 text-red-500"
                    >
                      &times;
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="Education p-2 mt-2 border rounded-lg shadow">
            <div className="EducationSection relative mt-6">
              <h1 className="text-lg font-semibold">Education</h1>
              <div className="education flex items-center justify-start">
                {isEditingEducation ? (
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      name="institution"
                      value={newEducation.institution}
                      onChange={(e) => {
                        handleEducationInputChange(
                          "institution",
                          e.target.value
                        );
                      }}
                      className="w-full border py-1 px-2 rounded"
                      placeholder="Institution"
                    />
                    <input
                      type="text"
                      name="degree"
                      value={newEducation.degree}
                      onChange={(e) =>
                        handleEducationInputChange("degree", e.target.value)
                      }
                      className="w-full border py-1 px-2 rounded"
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={newEducation.fieldOfStudy}
                      onChange={(e) =>
                        handleEducationInputChange(
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                      className="w-full border py-1 px-2 rounded"
                      placeholder="Field of Study"
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={newEducation.startDate}
                      onChange={(e) =>
                        handleEducationInputChange("startDate", e.target.value)
                      }
                      className="w-full border py-1 px-2 rounded"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={newEducation.endDate}
                      onChange={(e) =>
                        handleEducationInputChange("endDate", e.target.value)
                      }
                      className="w-full border py-1 px-2 rounded"
                      placeholder="End Date (optional)"
                    />
                    <input
                      type="text"
                      name="grade"
                      value={newEducation.grade}
                      onChange={(e) =>
                        handleEducationInputChange("grade", e.target.value)
                      }
                      className="w-full border py-1 px-2 rounded"
                      placeholder="Grade (optional)"
                    />
                    <button
                      onClick={handleAddEducation}
                      className="mt-2 bg-gray-50 px-2 text-sm py-1 text-black rounded-md"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-700">
                    {education.length === 0 ? "No education added" : ""}
                  </p>
                )}
                <button
                  onClick={
                    isEditingEducation
                      ? updateEducation
                      : () => setIsEditingEducation(true)
                  }
                  className="absolute top-0 right-0 bg-gray-50 px-2 text-sm py-1 text-black rounded-md"
                >
                  {isEditingEducation ? (
                    <span>Save</span>
                  ) : (
                    <FiEdit className="text-black" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-sm py-2 px-4 rounded mb-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{edu.institution}</p>
                    <p>
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p>
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                    {edu.grade && <p>Grade: {edu.grade}</p>}
                  </div>
                  {isEditingEducation && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="ml-2 text-red-500"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;