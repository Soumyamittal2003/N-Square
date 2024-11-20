import { useState } from "react";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectType: "",
    profilePhoto: null,
    technologyUsed: "",
    projectCreator: "",
    fundingRequired: "required",
    department: "",
    projectPhase: "initial",
    projectTopic: "",
    projectDescription: "",
    alumniMentor: "",
    facultyMentor: "",
    projectLink: "",
    eligibility: "",
    openForMentor: false,
    openForStudent: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
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
    console.log("Form Submitted:", formData);
  };

  return (
    <div className=" flex ">
      <form
        onSubmit={handleSubmit}
        className="bg-white mx-auto p-8 border rounded-lg shadow-lg w-full max-w-6xl"
      >
        <h2 className="text-2xl underline font-bold mb-8">Create Project :-</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Project Type */}
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            >
              <option value="" disabled>
                Project Type
              </option>
              <option value="Research Project">Research Project</option>
              <option value="Software Project">Software Project</option>
            </select>

            {/* Upload Project Profile Photo */}
            <div className="mb-6 flex flex-col items-center">
              <label
                htmlFor="profilePhoto"
                className="w-24 h-24 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition ease-in-out duration-200"
              >
                <input
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span className="text-2xl text-gray-500">📎</span>
              </label>
              <span className="text-sm text-gray-600 mt-2">
                Upload Project Profile Photo
              </span>
            </div>

            {/* Technology Used */}
            <input
              type="text"
              name="technologyUsed"
              value={formData.technologyUsed}
              onChange={handleInputChange}
              placeholder="Technology Used"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            />

            {/* Project Creator */}
            <input
              type="text"
              name="projectCreator"
              value={formData.projectCreator}
              onChange={handleInputChange}
              placeholder="Project Creator"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            />

            {/* Funding */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Funding
              </h2>
              <div className="flex space-x-6">
                <label className="flex items-center text-gray-600 hover:text-gray-800">
                  <input
                    type="radio"
                    name="fundingRequired"
                    value="required"
                    checked={formData.fundingRequired === "required"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-2">Required</span>
                </label>
                <label className="flex items-center text-gray-600 hover:text-gray-800">
                  <input
                    type="radio"
                    name="fundingRequired"
                    value="not_required"
                    checked={formData.fundingRequired === "not_required"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-2">Not Required</span>
                </label>
              </div>
            </div>

            {/* Select Department */}
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="Computer Science Engineering">
                Computer Science Engineering
              </option>
              <option value="Bio-Tech">Bio-Tech</option>
              <option value="Bsc">Bsc</option>
              <option value="BBA">BBA</option>
            </select>

            {/* Project Phase */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Project Phase
              </h2>
              <div className="flex space-x-6">
                <label className="flex items-center text-gray-600 hover:text-gray-800">
                  <input
                    type="radio"
                    name="projectPhase"
                    value="initial"
                    checked={formData.projectPhase === "initial"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-2">Initial</span>
                </label>
                <label className="flex items-center text-gray-600 hover:text-gray-800">
                  <input
                    type="radio"
                    name="projectPhase"
                    value="intermediate"
                    checked={formData.projectPhase === "intermediate"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-2">Intermediate</span>
                </label>
                <label className="flex items-center text-gray-600 hover:text-gray-800">
                  <input
                    type="radio"
                    name="projectPhase"
                    value="advance"
                    checked={formData.projectPhase === "advance"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-2">Advance</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Project Topic */}
            <input
              type="text"
              name="projectTopic"
              value={formData.projectTopic}
              onChange={handleInputChange}
              placeholder="Project Topic"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            />

            {/* Project Description */}
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              rows="4"
              placeholder="Project Description"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            ></textarea>

            {/* Alumni Mentor */}
            <input
              type="text"
              name="alumniMentor"
              value={formData.alumniMentor}
              onChange={handleInputChange}
              placeholder="Alumni Mentor"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            />

            {/* Faculty Mentor */}
            <input
              type="text"
              name="facultyMentor"
              value={formData.facultyMentor}
              onChange={handleInputChange}
              placeholder="Faculty Mentor"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            />

            {/* Open For */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Open For
              </h2>
              <div className="flex space-x-6">
                <label className="flex items-center text-gray-600 hover:text-gray-800">
                  <input
                    type="checkbox"
                    name="openForMentor"
                    checked={formData.openForMentor}
                    onChange={handleInputChange}
                    className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-2">Mentor</span>
                </label>
                <label className="flex items-center text-gray-600 hover:text-gray-800">
                  <input
                    type="checkbox"
                    name="openForStudent"
                    checked={formData.openForStudent}
                    onChange={handleInputChange}
                    className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-2">Student</span>
                </label>
              </div>
            </div>

            {/* Project Link */}
            <input
              type="text"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleInputChange}
              placeholder="Project Link"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white  py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            />

            {/* Eligibility */}
            <input
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleInputChange}
              placeholder="Eligibility"
              className="mb-6 block w-full rounded-md border border-gray-300 bg-white py-3 px-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition ease-in-out duration-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-800"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
