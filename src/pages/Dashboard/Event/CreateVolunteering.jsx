import { useState } from "react";

const CreateVolunteer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    PositionTittle: "",
    RolesResposiblity: "",
    Eligibility: "",
    SkillsQualification: "",
    VolunteerRequired: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add API submission logic here
    onClose(); // Close the popup after submission
  };

  const handleDiscard = () => {
    setFormData({
      PositionTittle: "",
      RolesResposiblity: "",
      Eligibility: "",
      SkillsQualification: "",
      VolunteerRequired: "",
    });
    onClose(); // Close the popup when discard is clicked
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[100%] max-w-lg rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Creating Volunteering Position
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Volunteer Position Tittle
            </label>
            <select
              name="PositionTittle"
              value={formData.PositionTittle}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select</option>
              <option value="Workshop">Event Coordinator</option>
              <option value="Seminar">manager</option>
              <option value="Competition">Support</option>
              <option value="Competition">Others</option>
            </select>
          </div>

          {/* Add other fields here without any changes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Roles/Responsibility
            </label>
            <input
              type="text"
              name="RolesResposiblity"
              value={formData.RolesResposiblity}
              onChange={handleInputChange}
              placeholder="Enter roles and responsibility" // Added placeholder
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Eligibility
            </label>
            <input
              type="text"
              name="Eligibility"
              value={formData.Eligibility}
              placeholder="Describe eligibility criteria" // Added placeholder
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills/Qualification
            </label>
            <input
              type="text"
              name="SkillsQualification"
              value={formData.SkillsQualification}
              placeholder="Enter skills and qualifications Required" // Added placeholder
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              No.of Volunteer Required for this Position
            </label>
            <input
              type="text"
              name="VolunteerRequired"
              value={formData.VolunteerRequired}
              placeholder="Enter Volunteer Required" // Added placeholder
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVolunteer;
