import { useState } from "react";
import CheckmarkAnimation from "../../../assets/animations/checkmark.gif";

const CreateEvent = () => {
  const [step, setStep] = useState(1);
  const [reminder, setReminder] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Initialize formData state
  const [formData, setFormData] = useState({
    title: "",
    coverImage: null,
    eventType: "",
    eventMode: "",
    date: "",
    time: "",
    enterVenue: "",
    eventLink: "",
    eventDescription: "",
    eventCoordinator: "",
    tagAndTopics: "",
    contactDetails: "",
    eligibility: "",
    speaker: "",
    organizedBy: "",

    reminder: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (type === "checkbox" || type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : prevData[name],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (name === "reminder") {
      setReminder(value);
    }
  };

  // Add tag to the tags array
  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 7 && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Remove tag from the tags array
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.length < 2 || tags.length > 7) {
      alert("Please add between 2 and 7 tags.");
      return;
    }
  };

  const handleNext = () => {
    // if (step === 3 && (tags.length < 2 || tags.length > 7)) {
    //   alert("Please add between 2 and 7 tags before proceeding.");
    //   return;
    // }
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold items-center">
            {step === 5 ? "Event Created Successfully!" : "Create an Event"}
          </h2>
        </div>

        {/* Step 1: Add Title and Cover Image */}
        {step === 1 && (
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Add Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-1">
                Upload Cover Image
              </label>
              <div className="w-full h-40 border border-gray-300 bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer">
                <label
                  htmlFor="coverImage"
                  className="text-gray-500 font-semibold"
                >
                  Add Image
                  <input
                    type="file"
                    name="coverImage"
                    id="coverImage"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div>
            <label className="block text-sm font-semibold mb-2">
              Type Of Event
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="font-semibold text-gray-300">
                Select Type
              </option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
              <option value="Webinar">Webinar</option>
              <option value="Training">Training</option>
            </select>
            <div className="flex gap-4 mt-4">
              <label className="block text-sm font-semibold mb-1">
                Event Mode:{" "}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="eventMode"
                  value="Online"
                  checked={formData.eventMode === "Online"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                Online
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="eventMode"
                  value="Offline"
                  checked={formData.eventMode === "Offline"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                Offline
              </label>
            </div>

            {/* Conditional Fields */}
            {formData.eventMode === "Offline" && (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Enter Venue
                </label>
                <input
                  type="text"
                  name="enterVenue"
                  value={formData.enterVenue}
                  onChange={handleInputChange}
                  placeholder="Enter Venue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {formData.eventMode === "Online" && (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Event Link
                </label>
                <input
                  type="url"
                  name="eventLink"
                  value={formData.eventLink}
                  onChange={handleInputChange}
                  placeholder="Event Link"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Event Description
              </label>
              <textarea
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleInputChange}
                rows="2"
                placeholder="Add a description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                className="px-4 py-2 border font-semibold border-gray-300 rounded-lg hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Remaining Steps */}
        {/* Step 3: Coordinators */}
        {step === 3 && (
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">
              Event Coordinator
            </label>
            <input
              type="text"
              name="facultyCoordinator"
              value={formData.eventCoordinator}
              onChange={handleInputChange}
              placeholder="Event Coordinator"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-semibold mb-2 mt-4">
              Contact Details
            </label>
            <input
              type="text"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleInputChange}
              placeholder="Contact Details- Email/ Phone"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2 mt-4">
                Tags / Topics
              </label>
              <div className="w-full border border-gray-300 rounded-lg p-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddTag();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={tags.length >= 7}
                  >
                    Add
                  </button>
                </form>

                {/* Error Message */}
                {tags.length < 2 || tags.length > 7 ? (
                  <p className="mt-2 text-sm text-red-500">
                    {tags.length < 2
                      ? "Please add at least 2 tags before proceeding."
                      : "You cannot add more than 7 tags."}
                  </p>
                ) : null}
              </div>
            </div>

            <label className="block text-sm font-semibold mb-2 mt-4">
              Eligibility
            </label>
            <select
              name="eligibility"
              value={formData.eligibility}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Eligibility</option>
              <option value="All">All</option>
              <option value="Faculty and Alumni">Faculty and Alumni</option>
              <option value="Faculty and Student">Faculty and Student</option>
              <option value="Alumni and Student">Alumni and Student</option>
              <option value="Only Faculty">Only Faculty</option>
              <option value="Only Alumni">Only Alumni</option>
              <option value="Only Student">Only Student</option>
            </select>

            <label className="block text-sm font-semibold mb-2 mt-4">
              Speaker
            </label>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleInputChange}
              placeholder="Enter Speaker Name"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-semibold mb-2 mt-4">
              Organized By
            </label>
            <input
              type="text"
              name="Organized By"
              value={formData.organizedBy}
              onChange={handleInputChange}
              placeholder="Enter Name of Organiser"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Add more fields for step 3 */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4 and 5 follow the same structure */}
        {/* Step 4: Add Reminder */}
        {step === 4 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Schedule Reminder
            </h2>

            <label className="block text-sm font-semibold mb-4">
              Notify your Viewer
            </label>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reminder"
                  value="15 minutes before"
                  checked={reminder === "15 minutes before"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                15 minutes Before
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reminder"
                  value="30 minutes before"
                  checked={reminder === "30 minutes before"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                30 minutes Before
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reminder"
                  value="1 hour before"
                  checked={reminder === "1 hour before"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                1 Hour Before
              </label>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {/* Final Step 5: Success */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold mb-4"></p>
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <img
                src={CheckmarkAnimation}
                alt="Checkmark Animation"
                className="w-full h-full"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
