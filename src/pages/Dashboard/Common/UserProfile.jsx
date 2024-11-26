import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import PostCard from "./PostCard";
import Cookies from "js-cookie";

const UserProfile = () => {
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [isEditingBannerImage, setIsEditingBannerImage] = useState(false);
  const [activeTab, setActiveTab] = useState("My Posts");
  const tabs = ["My Posts", "My Projects", "My Events", "My Job"];
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    about: "",
    tagline: "",
    role: "",
    followers: [],
    following: [],
  });
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = Cookies.get("id");
        const [userResponse, postsResponse] = await Promise.all([
          axiosInstance.get(`/users/${userId}`),
          axiosInstance.get(`/post/user/${userId}`),
        ]);

        const userData = userResponse.data.data;
        setProfileInfo({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          role: userData.role || "",
          about: userData.about || "",
          tagline: userData.tagLine || "",
          followers: userData.followers || [],
          following: userData.following || [],
        });
        setProfileImage(userData.profileimageUrl || "");
        setBannerImage(userData.backgroundimageUrl || "");
        setUserPosts(postsResponse.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const updateProfileInfo = async () => {
    try {
      const userId = Cookies.get("id");
      await axiosInstance.put(`/users/update/${userId}`, {
        about: profileInfo.about,
        tagline: profileInfo.tagline,
      });
      alert("Profile updated successfully!");
      setIsEditingAbout(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const userId = Cookies.get("id");
        const url =
          type === "profile"
            ? `/profile/updateProfileImage/${userId}`
            : `/profile/updateBackgroundImage/${userId}`;
        await axiosInstance.patch(url, formData);

        const imagePreview = URL.createObjectURL(file);
        if (type === "profile") setProfileImage(imagePreview);
        else setBannerImage(imagePreview);

        alert(
          `${type === "profile" ? "Profile" : "Banner"} image updated successfully!`
        );
        type === "profile"
          ? setIsEditingProfileImage(false)
          : setIsEditingBannerImage(false);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const getBorderColor = () => {
    switch (profileInfo.role) {
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
      <div className="w-1/3 m-2 p-2 overflow-y-auto hide-scrollbar h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative">
            <label htmlFor="profileImage">
              <img
                src={profileImage}
                alt="Profile"
                className={`rounded-full w-60 h-60 cursor-pointer border-8 ${getBorderColor()}`}
              />
            </label>
            {isEditingProfileImage && (
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "profile")}
              />
            )}
            <button
              onClick={() => setIsEditingProfileImage(!isEditingProfileImage)}
              className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
            >
              {isEditingProfileImage ? "Save" : "Edit"}
            </button>
          </div>
          <h1 className="mt-3 text-4xl font-bold">
            {profileInfo.firstName} {profileInfo.lastName}
          </h1>
          <div className="flex space-x-6 gap-2 m-3 p-5 px-10 border rounded-3xl">
            <div className="text-center">
              <p className="font-bold text-lg">
                {profileInfo.followers.length}
              </p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">
                {profileInfo.following.length}
              </p>
              <p className="text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{userPosts.length}</p>
              <p className="text-gray-500">Posts</p>
            </div>
          </div>
          {/* Tagline */}
          {isEditingAbout ? (
            <input
              type="text"
              name="tagline"
              value={profileInfo.tagline}
              onChange={handleInputChange}
              className="text-gray-500 border-b-2 w-1/2 focus:outline-none text-center"
            />
          ) : (
            <p className="text-gray-500">{profileInfo.tagline}</p>
          )}
          {/* About Section */}
          <div className="bg-white text-center border rounded-lg shadow mt-6 p-6 w-full">
            <h3 className="text-lg font-bold">About</h3>
            {isEditingAbout ? (
              <textarea
                name="about"
                value={profileInfo.about}
                onChange={handleInputChange}
                className="w-full mt-2 border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700 mt-2">{profileInfo.about}</p>
            )}
          </div>
          {isEditingAbout && (
            <button
              onClick={updateProfileInfo}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          )}
          {!isEditingAbout && (
            <button
              onClick={() => setIsEditingAbout(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Edit About
            </button>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-2/3 p-8">
        {/* Banner Image */}
        <div className="relative shadow-md rounded-lg">
          <label htmlFor="bannerImage">
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-60 object-cover cursor-pointer"
            />
          </label>
          {isEditingBannerImage && (
            <input
              type="file"
              id="bannerImage"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "banner")}
            />
          )}
          <button
            onClick={() => setIsEditingBannerImage(!isEditingBannerImage)}
            className="absolute bottom-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            {isEditingBannerImage ? "Save" : "Edit"}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border justify-around bg-white rounded-2xl shadow-md px-1 py-1 mt-6">
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
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          {activeTab === "My Posts" && (
            <div className="h-[calc(75vh-200px)] overflow-y-auto hide-scrollbar">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    user={profileInfo}
                    currentUserId={Cookies.get("id")}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No posts to show.</p>
              )}
            </div>
          )}
          {activeTab === "My Projects" && (
            <p className="text-center text-gray-500">No projects to show.</p>
          )}
          {activeTab === "My Events" && (
            <p className="text-center text-gray-500">No events to show.</p>
          )}
          {activeTab === "My Job" && (
            <p className="text-center text-gray-500">No jobs to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
