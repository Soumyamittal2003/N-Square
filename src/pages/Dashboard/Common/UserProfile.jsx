import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import PostCard from "./PostCard";
import Cookies from "js-cookie";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("My Posts");
  const tabs = ["My Posts", "My Projects", "My Events", "My Job"];
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    about: "",
    education: "",
    experience: "",
    skills: "",
    tagline: "",
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
          role: userData.role || "", // Add role
          profileImage: userData.profileimageUrl || "", // Add profile image
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          about: userData.about || "",
          tagline: userData.tagline || "",
        });
        setUserPosts(postsResponse.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleLikePost = async (postId) => {
    try {
      await axiosInstance.post(`/post/${postId}/like`);
      setUserPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(Cookies.get("id"))
                  ? post.likes.filter((id) => id !== Cookies.get("id"))
                  : [...post.likes, Cookies.get("id")],
                dislikes: post.dislikes.filter(
                  (id) => id !== Cookies.get("id")
                ), // Remove dislike
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleDislikePost = async (postId) => {
    try {
      await axiosInstance.post(`/post/${postId}/dislike`);
      setUserPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                dislikes: post.dislikes.includes(Cookies.get("id"))
                  ? post.dislikes.filter((id) => id !== Cookies.get("id"))
                  : [...post.dislikes, Cookies.get("id")],
                likes: post.likes.filter((id) => id !== Cookies.get("id")), // Remove like
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
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
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const saveProfileEdits = async () => {
    try {
      const userId = Cookies.get("id");
      const updatedProfile = {
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
        phone: profileInfo.phone,
        address: profileInfo.address,
        city: profileInfo.city,
        about: profileInfo.about,
        tagline: profileInfo.tagline,
      };

      await axiosInstance.put(`/users/update/${userId}`, updatedProfile);

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile edits:", error);
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
          {/* Editable Profile Image */}
          <label htmlFor="profileImage">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full w-60 mx-6 h-60 border-4 border-white cursor-pointer"
            />
          </label>
          {isEditing && (
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "profile")}
            />
          )}
          <h1 className="m-3 text-4xl font-bold">
            {profileInfo.firstName} {profileInfo.lastName}
          </h1>
          <div className="flex space-x-6 gap-2 m-3 p-5 px-10 border rounded-3xl">
            <div className="text-center">
              <p className="font-bold text-lg">12K</p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">13K</p>
              <p className="text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{userPosts.length}</p>
              <p className="text-gray-500">Posts</p>
            </div>
          </div>
          {/* Editable Tagline */}
          {isEditing ? (
            <input
              type="text"
              value={profileInfo.tagline}
              name="tagline"
              onChange={handleInputChange}
              className="text-gray-500 border-b-2 w-1/2 focus:outline-none text-center"
            />
          ) : (
            <p className="text-gray-500">{profileInfo.tagline}</p>
          )}
        </div>

        {/* Editable About Section */}
        <div className="bg-white text-center border rounded-lg shadow mt-6 p-6">
          <h3 className="text-lg font-bold">About</h3>
          {isEditing ? (
            <textarea
              name="about"
              value={profileInfo.about}
              onChange={handleInputChange}
              className="w-full mt-2 border p-2 rounded"
            />
          ) : (
            <p className="text-gray-700 mt-2">{profileInfo.about}</p>
          )}
          <h3 className="text-lg font-bold mt-4">Address</h3>
          {isEditing ? (
            <textarea
              name="address"
              value={profileInfo.address}
              onChange={handleInputChange}
              className="w-full mt-2 border p-2 rounded"
            />
          ) : (
            <p className="text-gray-700 mt-2">{profileInfo.address}</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-2/3 p-8">
        <div className="relative shadow-md rounded-lg">
          {/* Editable Banner Image */}
          <label htmlFor="bannerImage">
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-60 object-cover cursor-pointer"
            />
          </label>
          {isEditing && (
            <input
              type="file"
              id="bannerImage"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "banner")}
            />
          )}
          <button
            onClick={() =>
              isEditing ? saveProfileEdits() : setIsEditing(true)
            }
            className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-lg shadow text-gray-700 font-semibold"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-md px-1 py-1 mt-6 mx-4">
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

        {/* Active Tab Content */}
        <div className="mt-6 mx-4">
          {activeTab === "My Posts" && (
            <div className="w-full bg-[#ffffff] h-[calc(75vh-200px)] overflow-y-auto hide-scrollbar">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    user={{
                      firstName: profileInfo.firstName,
                      lastName: profileInfo.lastName,
                      role: profileInfo.role,
                      profileimageUrl: profileInfo.profileImage,
                    }}
                    currentUserId={Cookies.get("id")} // Pass the current user ID
                    onLikePost={handleLikePost} // Pass like handler
                    onDislikePost={handleDislikePost} // Pass dislike handler
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
