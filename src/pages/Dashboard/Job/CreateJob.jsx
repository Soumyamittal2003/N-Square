import { useState } from "react";
import axiosInstance from "../../../utils/axiosinstance"; // Importing the axiosInstance you set up
import Cookies from "js-cookie";

const CreateJob = ({ onClose }) => {
  const [jobphoto, setJobphoto] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [type, setType] = useState("");
  const [stipendOrSalary, setStipendOrSalary] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      // Update the corresponding state for file input (jobphoto)
      if (name === "jobphoto") {
        setJobphoto(files[0]);
        setProfileImagePreview(URL.createObjectURL(files[0]));
        console.log(profileImagePreview);
      }
    } else if (type === "checkbox") {
      // Handle checkbox (if there are any in the future)
      if (name === "someCheckbox") {
        // Handle the checkbox state here
      }
    } else {
      // Update the corresponding state for text inputs
      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "company":
          setCompany(value);
          break;
        case "location":
          setLocation(value);
          break;
        case "description":
          setDescription(value);
          break;
        case "skills":
          setSkills(value);
          break;
        case "type":
          setType(value);
          break;
        case "stipendOrSalary":
          setStipendOrSalary(value);
          break;
        case "applyLink":
          setApplyLink(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare FormData to send as multipart/form-data
    const formDataToSend = new FormData();
    formDataToSend.append("jobphoto", jobphoto);
    formDataToSend.append("title", title);
    formDataToSend.append("company", company);
    formDataToSend.append("location", location);
    formDataToSend.append("description", description);
    formDataToSend.append("skills", skills);
    formDataToSend.append("type", type);
    formDataToSend.append("stipendOrSalary", stipendOrSalary);
    formDataToSend.append("applyLink", applyLink);

    try {
      console.log(formDataToSend);
      const response = await axiosInstance.post(
        "/jobs/create",
        {
          title,
          company,
          location,
          description,
          skills,
          type,
          stipendOrSalary,
          applyLink,
          jobphoto,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Handle successful job creation
      console.log("Job created successfully:", response.data);
      onClose(); // Close the modal after successful submission
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
        <div className="flex justify-between items-center mb-2">
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
          <div className="flex flex-col items-center">
            <label
              htmlFor="jobphoto"
              className="w-14 h-14 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition ease-in-out duration-200"
            >
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile Preview"
                  className="rounded-full w-12 h-12 object-cover"
                />
              ) : (
                <span className="text-2xl text-gray-500">📎</span>
              )}
            </label>
            <input
              type="file"
              name="jobphoto"
              id="jobphoto"
              onChange={handleInputChange}
              className="hidden"
            />
            <span className="text-sm text-gray-600 mt-2">Upload Job Photo</span>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium mb-0">Job Title</label>
            <input
              type="text"
              name="title"
              value={title}
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
              value={company}
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
              value={location}
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
              value={skills}
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
              value={type}
              onChange={handleInputChange}
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="internship">Internship</option>
              <option value="apprenticeship">Apprenticeship</option>
              <option value="job">Job</option>
            </select>
          </div>

          {/* Stipend Or Salary */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Stipend Or Salary
            </label>
            <input
              type="text"
              name="stipendOrSalary"
              value={stipendOrSalary}
              onChange={handleInputChange}
              placeholder="Stipend or Salary"
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
              value={applyLink}
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
              value={description}
              onChange={handleInputChange}
              rows="2"
              placeholder="Add a description"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreateJob;
