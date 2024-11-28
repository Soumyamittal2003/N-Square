import { useState } from "react";
import CheckmarkAnimation from "../../../assets/animations/checkmark.gif";

const CreateEvent = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [reminder, setReminder] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Initialize formData state
  const [formData, setFormData] = useState({
    title: "",
    eventphoto: "",
    type: "",
    mode: "",
    venue: "",
    link: "",
    date: "",
    time: "",
    eventDescription: "",
    eventCoordinator: "",
    coordinatorphone: "",
    tagsTopic: "",
    eligibility: "",
    speaker: "",
    organizedBy: "",
    reminder: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    // Handle file input
    if (type === "file") {
      // If file is selected, update the form data with the file object
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the first selected file
      }));
    } else if (type === "checkbox" || type === "radio") {
      // Handle checkbox or radio input
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : prevData[name],
      }));
    } else {
      // Handle regular text input (e.g., text, select, etc.)
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
  const handleSubmit = () => {
    // Prepare FormData for the API submission
    const formPayload = new FormData();

    // Append the text fields to the FormData object
    formPayload.append("title", formData.title);
    formPayload.append("type", formData.type);
    formPayload.append("mode", formData.mode);
    formPayload.append("date", formData.date);
    formPayload.append("time", formData.time);
    formPayload.append("eventDescription", formData.eventDescription);
    formPayload.append("eventCoordinator", formData.eventCoordinator);
    formPayload.append("coordinatorphone", formData.coordinatorphone);
    formPayload.append("tagsTopic", tags.join(", ")); // Joining tags as a comma-separated string
    formPayload.append("eligibility", formData.eligibility);
    formPayload.append("speaker", formData.speaker);
    formPayload.append("organizedBy", formData.organizedBy);
    formPayload.append("reminder", formData.reminder);

    // Handle the eventphoto (image upload)
    if (formData.eventphoto) {
      formPayload.append("eventphoto", formData.eventphoto);
    }

    // Handle the venue and link based on mode
    if (formData.mode === "Offline") {
      formPayload.append("venue", formData.venue);
    } else if (formData.mode === "Online") {
      formPayload.append("link", formData.link);
    }

    // Log the form data before sending to the API (for debugging purposes)
    console.log("Form Data with image for API submission:", formPayload);
    setStep(5);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleDiscard = () => {
    setFormData({
      title: "",
      eventphoto: "",
      type: "",
      mode: "",
      venue: "",
      link: "",
      date: "",
      time: "",
      eventDescription: "",
      eventCoordinator: "",
      coordinatorphone: "",
      tagsTopic: "",
      eligibility: "",
      speaker: "",
      organizedBy: "",
      reminder: "",
    });
    setTags([]);
    setTagInput("");
    setStep(1);
    onClose(); // Reset to step 1
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <button
          onClick={handleDiscard}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ×
        </button>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold items-center">
            {step === 5 ? "Event Created Successfully!" : "Create an Event"}
          </h2>
        </div>
        {step === 1 && (
          <div>
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Event Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Cover Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">
                Upload Cover Image
              </label>
              <div className="w-full h-40 border border-gray-300 bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer">
                <label
                  htmlFor="eventphoto"
                  className="text-gray-500 font-semibold"
                >
                  Add Image
                  <input
                    type="file"
                    name="eventphoto"
                    id="eventphoto"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Preview of Uploaded Image */}
            {formData.eventphoto && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Preview:</p>
                <img
                  src={URL.createObjectURL(formData.eventphoto)}
                  alt="Cover Preview"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            {/* Event Type Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Type of Event
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="font-semibold text-gray-300">
                  Select Event Type
                </option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Webinar">Webinar</option>
                <option value="Training">Training</option>
              </select>
            </div>

            {/* Event Mode: Online or Offline */}
            <div className="flex gap-4 mt-4">
              <label className="block text-sm font-semibold mb-2">
                Event Mode
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mode"
                    value="Online"
                    checked={formData.mode === "Online"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  Online
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mode"
                    value="Offline"
                    checked={formData.mode === "Offline"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  Offline
                </label>
              </div>
            </div>

            {/* Conditional Fields based on Event Mode */}
            {/* If Event Mode is "Offline", ask for Venue */}
            {formData.mode === "Offline" && (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Enter Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Enter Venue"
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* If Event Mode is "Online", ask for Event Link */}
            {formData.mode === "Online" && (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Event Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="Enter Event Link (e.g. Zoom, Google Meet)"
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Event Date */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Event Time */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Event Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Event Description */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Event Description
              </label>
              <textarea
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleInputChange}
                rows="3"
                placeholder="Add a brief description about the event"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Navigation Buttons */}
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
            {/* Event Coordinator */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Event Coordinator
              </label>
              <input
                type="text"
                name="eventCoordinator"
                value={formData.eventCoordinator}
                onChange={handleInputChange}
                placeholder="Enter Event Coordinator's Name"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Contact Details */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Contact Details
              </label>
              <input
                type="text"
                name="coordinatorphone"
                value={formData.coordinatorphone}
                onChange={handleInputChange}
                placeholder="Enter coordinator phone"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tags / Topics */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Tags / Topics
              </label>
              <div className="w-full border border-gray-300 rounded-lg p-3">
                {/* Display Tags */}
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

                {/* Tag Input Form */}
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

                {/* Error Message for Tag Count */}
                {tags.length < 2 && (
                  <p className="mt-2 text-sm text-red-500">
                    You must add at least 2 tags before proceeding.
                  </p>
                )}
                {tags.length > 7 && (
                  <p className="mt-2 text-sm text-red-500">
                    You cannot add more than 7 tags.
                  </p>
                )}
              </div>
            </div>

            {/* Eligibility */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
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
            </div>

            {/* Speaker Name */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Speaker Name
              </label>
              <input
                type="text"
                name="speaker"
                value={formData.speaker}
                onChange={handleInputChange}
                placeholder="Enter Speaker's Name"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Organized By */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Organized By
              </label>
              <input
                type="text"
                name="organizedBy"
                value={formData.organizedBy}
                onChange={handleInputChange}
                placeholder="Enter Name of Organizer"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                className="px-4 py-2 border font-semibold border-gray-300 rounded-lg hover:bg-gray-200"
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

            {/* Reminder Notification Options */}
            <label className="block text-sm font-semibold mb-4">
              Notify your Viewer
            </label>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reminder"
                  value="15 minutes before"
                  checked={formData.reminder === "15 minutes before"}
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
                  checked={formData.reminder === "30 minutes before"}
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
                  checked={formData.reminder === "1 hour before"}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                1 Hour Before
              </label>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={handleSubmit} // This now submits the form if Step 4
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!formData.reminder} // Disable if no reminder is selected
              >
                {step === 4 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        )}

        {/* Final Step 5: Success */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold mb-4">
              Your event has been created successfully!
            </p>
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <img
                src={CheckmarkAnimation}
                alt="Checkmark Animation"
                className="w-full h-full"
              />
            </div>
            <button
              onClick={onClose}
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
