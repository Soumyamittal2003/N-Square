import { useState } from "react";

const CreateJob = ({ onClose }) => {
  const [formData, setFormData] = useState({
    profilePhoto: null,
    jobRole: "",
    company: "",
    jobLocation: "",
    skills: "",
    jobType: "",
    stipendOrSalary: "",
    applyLink: "",
    jobDescription: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send formData to backend
  };

  return (
    <div className=" fixed inset-0 z-70 flex items-center justify-center bg-black bg-opacity-50">
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
              htmlFor="profilePhoto"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition ease-in-out duration-200"
            >
              <input
                type="file"
                name="JobPhoto"
                id="profilePhoto"
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
              name="jobRole"
              value={formData.jobRole}
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
              name="jobLocation"
              value={formData.jobLocation}
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
            <label className="block text-sm font-medium mb-1">Types</label>
            <select
              name="jobType"
              value={formData.jobType}
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
              name="Enter Stipend or Salary"
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
              name="Add a Job Description"
              value={formData.jobDescription}
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
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
