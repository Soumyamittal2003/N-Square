import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import PostCard from "./PostCard";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("My Posts");
  const tabs = ["My Posts", "My Projects", "My Events", "My Job"];
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    about: "",
    tagline: "",
  });
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [bannerImage, setBannerImage] = useState(
    "https://via.placeholder.com/800x200"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axiosInstance.get(`/users/${userId}`);
        const userData = response.data.data;
        setProfileInfo({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          about: userData.about || "",
          tagline: userData.tagline || "",
        });
        setProfileImage(userData.profileimageUrl || profileImage);
        setBannerImage(userData.backgroundimageUrl || bannerImage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
        const userId = localStorage.getItem("id");
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
      const userId = localStorage.getItem("id");
      const updatedProfile = {
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
        phone: profileInfo.phone,
        address: profileInfo.address,
        city: profileInfo.city,
        about: profileInfo.about,
        tagline: profileInfo.tagline,
      };

      axiosInstance.put(`/users/update/${userId}`, updatedProfile);

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile edits:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading profile...</div>;
  }

  const postText = `
    In this extensive post, we delve deep into the crucial aspect of risk
    management in trading and investing. From understanding risk types to
    implementing effective risk mitigation strategies, we cover everything you
    need to know to safeguard your investments and optimize your portfolio's
    performance. Don't miss out on this invaluable resource for traders and
    investors alike! #RiskManagement #InvestingInsights #PortfolioProtection
  `;
  const postImages = ["https://picsum.photos/900/400/?blur"];

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
              <p className="font-bold text-lg">13K</p>
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
              <PostCard text={postText} images={postImages} />
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
