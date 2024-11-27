import { useState } from "react";
import CheckmarkAnimation from "../../../assets/animations/checkmark.gif";

const CreateEvent = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [reminder, setReminder] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

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

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 7 && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleDiscard = () => {
    setFormData({
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
    setTags([]);
    setTagInput("");
    setStep(1); // Reset to the first step
    onClose(); // Close the modal
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.length < 2 || tags.length > 7) {
      alert("Please add between 2 and 7 tags.");
      return;
    }
    // Add form submission logic here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Discard Button */}
        <button
          onClick={handleDiscard}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {step === 5 ? "Event Created Successfully!" : "Create an Event"}
          </h2>
        </div>

        {/* Steps Content */}
        {step === 1 && (
          <div>
            <label className="block text-sm mb-1 font-semibold">Add Title</label>
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

        {/* Other steps (2, 3, 4, 5) remain unchanged */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center">
            <img
              src={CheckmarkAnimation}
              alt="Checkmark Animation"
              className="w-24 h-24 mb-6"
            />
            <p className="text-lg font-bold mb-4">Event Created Successfully!</p>
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
