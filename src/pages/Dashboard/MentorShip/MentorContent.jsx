import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pic from "../../../assets/icons/pic.svg";
import axiosInstance from "../../../utils/axiosinstance";
import { toast } from "react-toastify";


const MentorContent = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    groupProfileImage: null,
  });
  const [preview, setPreview] = useState(null);

  // Fetch current user ID from local storage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("chat-app-current-user"));

        if (storedUser && storedUser._id) {
          const userId = storedUser._id;

          // Fetch user details by ID
          const response = await axiosInstance.get(
            `/users/${userId}`
          );

          const userData = response.data.data;
          setIsMentor(userData.isMentor);
        } else {
          toast.error("No current user found in local storage.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes for group name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change for group profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        groupProfileImage: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission for creating a group
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("groupProfileImage", formData.groupProfileImage);

      const response = await axiosInstance.post("/groups/create-group", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Group created successfully!");
        setShowModal(false);
        setFormData({ name: "", groupProfileImage: null });
        setPreview(null);
      } else {
        toast.error(response.data.message || "Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("An error occurred while creating the group.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Top buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-6 py-2 transition-colors"
          onClick={() => navigate("groups")}
        >
          View your Groups
        </button>
        {isMentor && (
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-2 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Create Group
          </button>
        )}
      </div>

      {/* Modal for Creating Group */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Group</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="groupProfileImage" className="block text-gray-700 mb-2">
                  Group Profile Image
                </label>
                {!preview ? (
                  <input
                    type="file"
                    id="groupProfileImage"
                    name="groupProfileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border rounded w-full px-3 py-2"
                    required
                  />
                ) : (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => {
                        setPreview(null);
                        setFormData((prev) => ({
                          ...prev,
                          groupProfileImage: null,
                        }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  onClick={() => {
                    setShowModal(false);
                    setPreview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">DIGITAL ENGAGEMENT PROGRAMS</h2>
          <p className="text-gray-700 text-lg mb-4">Run impactful mentorship programs without hassle.</p>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("find-group")}
          >
            Find a Mentor Group
          </button>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <img src={pic} alt="Illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default MentorContent;
