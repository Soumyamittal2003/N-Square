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

  const updateAboutSection = async () => {
    try {
      await axiosInstance.put(`/users/update/${userId}`, {
        about: profileData.about,
        tagLine: profileData.tagLine,
      });
      toast.success("Profile updated successfully!");
      setIsEditingAbout(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
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
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      <div className="w-full lg:w-1/3 p-6">
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
          <div className="relative w-36 h-36">
            <img
              src={profileimageUrl}
              alt="Profile"
              className={`rounded-full border-8 ${getBorderColor()}`}
              onClick={() => setIsEditingProfileImage(true)}
            />
            {isEditingProfileImage && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <label
                  htmlFor="profileimageUrl"
                  className="bg-white px-2 py-1 text-black rounded-lg font-semibold cursor-pointer"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="profileimageUrl"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold mt-4">{`${profileData.firstName} ${profileData.lastName}`}</h1>
          <p className="text-center text-gray-600 mt-2">
            {profileData.tagLine}
          </p>
          <p className="text-gray-500">{profileData.tagLine}</p>
          <div className="flex justify-around w-full mt-4 text-center">
            <div className="flex flex-col items-center">
              <FaUserFriends className="text-2xl text-gray-600 mb-1" />
              <p className="text-lg font-bold">
                {profileData.followers.length}
              </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <FaUserFriends className="text-2xl text-gray-600 mb-1" />
              <p className="text-lg font-bold">
                {profileData.following.length}
              </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="flex flex-col items-center">
              <FaRegFileAlt className="text-2xl text-gray-600 mb-1" />
              <p className="text-lg font-bold">{userPosts.length}</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-2">About</h2>
          {isEditingAbout ? (
            <textarea
              name="about"
              value={profileData.about}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p className="text-gray-600">{profileData.about}</p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
            onClick={
              isEditingAbout
                ? updateAboutSection
                : () => setIsEditingAbout(true)
            }
          >
            {isEditingAbout ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      <div className="w-full lg:w-2/3 p-6">
        <div className="relative">
          <img
            src={backgroundimageUrl}
            alt="Banner"
            className="w-full h-60 object-cover rounded-lg shadow-md"
            onClick={() => setIsEditingBannerImage(true)}
          />
          {isEditingBannerImage && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <label
                htmlFor="backgroundimageUrl"
                className="bg-white px-4 py-2 text-black rounded-lg font-semibold cursor-pointer"
              >
                Upload
              </label>
              <input
                type="file"
                id="backgroundimageUrl"
                accept="image/*"
                className="hidden"
                onChange={handleBannerImageChange}
              />
            </div>
          )}
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-around border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-4 text-sm font-bold ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "My Posts" && (
              <div>
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No posts available.
                  </p>
                )}
              </div>
            )}
            {activeTab === "My Projects" && (
              <div>
                {userProjects.length > 0 ? (
                  userProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No projects available.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;