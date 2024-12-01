import { useNavigate } from "react-router-dom";
import { useState } from "react";
import pic from "../../../assets/icons/pic.svg";
import axiosInstance from "../../../utils/axiosinstance";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const MentorContent = () => {
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    groupProfileImage: null,
  });
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        groupProfileImage: file,
      }));
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axiosInstance.post(
        "/groups/create-group",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data.success === true) {
        toast.success("Group created successfully!");
        setShowModal(false);
        setFormData({ name: "", groupProfileImage: null });
        setPreview(null); // Reset the preview
      } else {
        toast.error("Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 items-center w-3/4">
      {/* Top buttons */}
      <div className="flex gap-4 py-2 items-center justify-end">
        <button
          className="text-white bg-zinc-800 rounded-md px-4 py-1"
          onClick={(e) => {
            e.preventDefault();
            navigate("groups");
          }}
        >
          View your Groups
        </button>
        {(role === "alumni" || role === "faculty") && (
          <button
            className="text-white bg-zinc-800 rounded-md px-4 py-1"
            onClick={() => setShowModal(true)}
          >
            Create Group
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Group</h2>
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
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="groupProfileImage"
                  className="block text-gray-700 mb-2"
                >
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
                      className="w-full h-48 object-cover rounded"
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
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowModal(false);
                    setPreview(null); // Reset preview on modal close
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex mt-6">
        <div className="w-6/9">
          <h2 className="text-2xl font-bold mb-20">
            DIGITAL ENGAGEMENT PROGRAMS
          </h2>
          <p className="text-gray-700 text-lg mb-2">Run impactful</p>
          <p className="text-gray-700 text-lg mb-2">mentorship programs</p>
          <p className="text-gray-700 text-lg mb-20">without hassle</p>
          <button
            className="bg-black text-white px-6 py-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              navigate("find-group");
            }}
          >
            Find a Mentors Group
          </button>
        </div>

        {/* Right Content (Illustration) */}
        <div className="w-1200 h-1200 justify-center">
          <img src={pic} alt="Illustration" className="w-1200" />
        </div>
      </div>
    </div>
  );
};

export default MentorContent;
