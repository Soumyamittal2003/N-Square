import { useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";

const CreateJob = ({ onClose }) => {
  const [formData, setFormData] = useState({
    jobphoto: null,
    title: "",
    company: "",
    location: "",
    skills: "",
    type: "",
    stipendOrSalary: "",
    applyLink: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Assign the first selected file.
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
      console.log(key, formData[key]);
    }

    try {
      // Replace this URL with your actual API endpoint
      
        const response = await axiosInstance.post("/jobs/create",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Handle successful job creation
      console.log("Job created successfully:", response.data);
      onClose();  // Close the modal after successful submission
    } catch (err) {
      console.error("Error creating job:", err);
      setError("An error occurred while creating the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[100%] max-w-lg rounded-lg shadow-lg p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold justify-center">Create a Job</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
          >
            &times;
          </button>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Profile Photo */}
          <div className="mb-4 flex flex-col items-center">
            <label
              htmlFor="jobphoto"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition ease-in-out duration-200"
            >
              <input
                type="file"
                name="jobphoto"
                id="jobphoto"
                onChange={handleInputChange}
                className="hidden"
              />
              <span className="text-2xl text-gray-500">📎</span>
            </label>
            <span className="text-sm text-gray-600 mt-2">Upload Job Photo</span>
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-sm font-medium mb-0">Job Role</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State, Country"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Skills Required"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="Internship">Internship</option>
              <option value="Apprenticeship">Apprenticeship</option>
              <option value="Job">Job</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Stipend Or Salary
            </label>
            <input
              type="text"
              name="stipendOrSalary"
              value={formData.stipendOrSalary}
              onChange={handleInputChange}
              placeholder="Stipend Required"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Apply Link */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Apply Link (This Will be provided to all registered Users)
            </label>
            <input
              type="url"
              name="applyLink"
              value={formData.applyLink}
              onChange={handleInputChange}
              placeholder="Apply Link"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="2"
              placeholder="Add a description"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 ${isSubmitting ? "cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
