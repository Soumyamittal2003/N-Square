import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ProjectCard from "../Project/ProjectCard";
import PostCard from "../Common/PostCard";
import { FiEdit } from "react-icons/fi";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    about: "",
    tagLine: "edit your tagline",
    role: "",
    email: "",
    education: "enter your qualifications",
    skills: "enter your skills",
    experience: "enter your experience",
    certificationAndLicensePublication: "",
    publicationAndResearchWorks: "",
    followers: [],
    following: [],
  });
  const [userData, setUserData] = useState("");
  const [profileimageUrl, setprofileimageUrl] = useState("");
  const [backgroundimageUrl, setbackgroundimageUrl] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("My Posts");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [isEditingBannerImage, setIsEditingBannerImage] = useState(false);
  const [loading, setLoading] = useState(true);

  const tabs = ["My Posts", "My Projects", "My Events", "My Job"];
  const userId = Cookies.get("id");
  // Fetch User Profile and Posts
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
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          about: data.about || "",
          tagLine: data.tagLine || "",
          role: data.role || "",
          email: data.email || "",
          followers: data.followers || [],
          following: data.following || [],
        });
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
  const updateAboutSection = async () => {
    try {
      await axiosInstance.put(`/users/update/${userId}`, {
        about: profileData.about,
        tagLine: profileData.tagLine,
      });
      alert("Profile updated successfully!");
      setIsEditingAbout(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle Input Change for About Section
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Image Upload (Profile or Banner)
  // Handle Image Upload
  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeMB = 2; // 2MB

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

    // Create FormData for the API call
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
        const updatedImageUrl = URL.createObjectURL(file); // Temporary preview URL
        setprofileimageUrl(updatedImageUrl); // Update the actual image URL state
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
    const maxSizeMB = 2; // 2MB

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

    // Create FormData for the API call
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
        const updatedBannerUrl = URL.createObjectURL(file); // Temporary preview URL
        setbackgroundimageUrl(updatedBannerUrl); // Update the actual banner image URL state
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
    switch (profileData.role) {
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
    <div className="flex w-full min-h-screen">
      {/* Left Section */}
      <div className="w-[40%] p-4 ">
        <div className="flex flex-col items-center">
          {/* Profile Section */}
          <div className="w-full h-80 p-3 bg-white rounded-lg shadow-lg border mx-auto flex flex-col items-center justify-center">
            <div className="relative w-fit">
              {/* Dimmed Background Overlay */}
              {isEditingProfileImage && (
                <div className="absolute inset-0 rounded-full m-2 bg-black bg-opacity-50 flex justify-center items-center z-10">
                  <label
                    htmlFor="profileimageUrl"
                    className="bg-white text-black px-1 rounded-lg font-semibold z-20 cursor-pointer"
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
                className={`rounded-full w-36 h-36 cursor-pointer border-8 ${getBorderColor()}`}
                onClick={() => setIsEditingProfileImage(true)} // Open editing mode
              />

              {/* Edit Button */}
              {!isEditingProfileImage && (
                <button
                  onClick={() => setIsEditingProfileImage(true)}
                  className="absolute bottom-2 right-2 bg-white bg-opacity-25 text-black p-2 rounded-full text-md"
                >
                  <FiEdit className="text-black" />
                </button>
              )}
            </div>

            <h1 className=" text-xl font-bold text-center">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-gray-700 text-xs">{profileData.email}</p>

            {/* show tagLine here */}
            <div className="text-md text-gray-600 text-center">
              {isEditingAbout ? (
                <textarea
                  name="tagLine"
                  value={profileData.tagLine}
                  onChange={handleInputChange}
                  className="w-full border rounded h-8 py-0 px-2 overflow-hidden "
                />
              ) : (
                <p className="text-gray-700">{profileData.tagLine}</p>
              )}
            </div>

            <div className="flex space-x-6 gap-2 p-1 mt-1 px-4 border rounded-3xl justify-center">
              <div className="text-center">
                <p className="font-bold text-lg">
                  {profileData.followers.length}
                </p>
                <p className="text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">
                  {profileData.following.length}
                </p>
                <p className="text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{userPosts.length}</p>
                <p className="text-gray-500">Posts</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="relative bg-white text-center border rounded-lg shadow mt-4 p-4 w-full h-[360px] overflow-y-auto hide-scrollbar">
            <button
              onClick={
                isEditingAbout
                  ? updateAboutSection
                  : () => setIsEditingAbout(true)
              }
              className="absolute top-1 right-1 bg-gray-50 px-2 text-sm py-1 text-black  rounded-md"
            >
              {isEditingAbout ? (
                <span>Save</span>
              ) : (
                <FiEdit className="text-black" />
              )}
            </button>
            {/* this is about section */}
            <div>
              <h3 className="text-lg font-bold">About</h3>
              {isEditingAbout ? (
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleInputChange}
                  className="w-full border py-0 h-8 px-2 rounded"
                />
              ) : (
                <p className="text-gray-700">{profileData.about}</p>
              )}
            </div>
            {/* experience section */}
            <div>
              <h3 className="text-lg font-bold">Experience</h3>
              {isEditingAbout ? (
                <textarea
                  name="experience"
                  value={profileData.experience}
                  onChange={handleInputChange}
                  className="w-full border py-0 h-8 px-2 rounded"
                />
              ) : (
                <p className="text-gray-700">{profileData.experience}</p>
              )}
            </div>
            {/* education */}
            <div>
              <h3 className="text-lg font-bold">Education</h3>
              {isEditingAbout ? (
                <textarea
                  name="education"
                  value={profileData.education}
                  onChange={handleInputChange}
                  className="w-full border py-0 h-8 px-2  rounded"
                />
              ) : (
                <p className="text-gray-700">{profileData.education}</p>
              )}
            </div>
            {/* skills */}
            <div>
              <h3 className="text-lg font-bold">Skills</h3>
              {isEditingAbout ? (
                <textarea
                  name="skills"
                  value={profileData.skills}
                  onChange={handleInputChange}
                  className="w-full border py-0 h-8 px-2  rounded"
                />
              ) : (
                <p className="text-gray-700">{profileData.skills}</p>
              )}
            </div>
            {/* publication */}
            <div>
              <h3 className="text-lg font-bold">
                publication and research works
              </h3>
              {isEditingAbout ? (
                <textarea
                  name="publicationAndResearchWorks"
                  value={profileData.publicationAndResearchWorks}
                  onChange={handleInputChange}
                  className="w-full border py-0 h-8 px-2  rounded"
                />
              ) : (
                <p className="text-gray-700">
                  {profileData.publicationAndResearchWorks}
                </p>
              )}
            </div>
            {/* certification */}
            <div>
              <h3 className="text-lg font-bold">
                Certification and License Publication
              </h3>
              {isEditingAbout ? (
                <textarea
                  name="certificationAndLicensePublication"
                  value={profileData.certificationAndLicensePublication}
                  onChange={handleInputChange}
                  className="w-full border py-0 h-8 px-2  rounded"
                />
              ) : (
                <p className="text-gray-700">
                  {profileData.certificationAndLicensePublication}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[60%] p-4">
        {/* Banner Image Section */}
        <div className="relative shadow-md rounded-lg">
          {/* Dimmed Background Overlay */}
          {isEditingBannerImage && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
              <label
                htmlFor="backgroundimageUrl"
                className="bg-white text-black p-1 rounded-lg font-semibold z-20 cursor-pointer"
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

          {/* Banner Image */}
          <img
            src={backgroundimageUrl} // Use temp preview if available
            alt="Banner"
            className="w-full h-60 object-cover cursor-pointer"
            onClick={() => setIsEditingBannerImage(true)} // Open editing mode
          />

          {/* Edit Button */}
          {!isEditingBannerImage && (
            <button
              onClick={() => setIsEditingBannerImage(true)}
              className="absolute top-2 right-2 bg-white bg-opacity-25 text-white px-2 text-center rounded-full text-md z-20"
            >
              <FiEdit className="text-white" />
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border justify-around bg-white rounded-2xl shadow-md px-1 py-1 m-3">
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
          {activeTab === "My Posts" && (
            <div className="h-[calc(75vh-200px)] overflow-y-auto hide-scrollbar">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    user={userData}
                    currentUserId={userId}
                    onLikePost={(postId) => console.log(`Liked post ${postId}`)}
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
          {activeTab === "My Projects" && (
            <div className="h-[calc(75vh-200px)] overflow-y-auto hide-scrollbar">
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
          {activeTab === "My Events" && (
            <div className="h-[calc(75vh-200px)] overflow-y-auto hide-scrollbar">
              {/* Placeholder for events */}
              <p className="text-center text-gray-500">No events to show.</p>
            </div>
          )}
          {activeTab === "My Job" && (
            <div className="h-[calc(75vh-200px)] overflow-y-auto hide-scrollbar">
              {/* Placeholder for jobs */}
              <p className="text-center text-gray-500">No jobs to show.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
