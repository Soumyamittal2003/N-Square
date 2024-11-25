import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import uploadMedia from "../../../assets/images/upload.png";
import emoji from "../../../assets/images/emoji.png";

const CreatePost = ({ onClose }) => {
  const [formData, setFormData] = useState({
    content: "",
    postType: "Post", // Default story type
    attachedFile: null,
  });

  
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, attachedFile: file }));
  };

  const handleEmojiClick = (emojiObject) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + emojiObject.emoji,
    }));
    setEmojiPickerOpen(false); // Close the emoji picker after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleDiscard = () => {
    setFormData({
      content: "",
      storyType: "Story",
      attachedFile: null,
    });
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <div className="fixed h-full inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-w-3xl relative">
        {/* Discard Button */}
        <button
          onClick={handleDiscard}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          {/* User Info */}
          <div className="flex items-center mb-6">
            <img
              src="/path-to-profile-image.jpg" // Replace with actual profile image
              alt="Profile"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="relative">
              <h2 className="font-semibold text-gray-800">Lauy Rahil</h2>
              <div
                className="relative cursor-pointer mt-1 text-gray-500"
              >
                {formData.postType}
                <span className="ml-1 text-sm">&#x25BC;</span>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Share Your Insights: Engage, Schedule, Poll"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:border-blue-300"
            rows="8"
          ></textarea>

          {/* Actions */}
          <div className="flex justify-between items-center mt-6">
            {/* File Attach */}
            <label
              htmlFor="fileInput"
              className="flex items-center text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <img
                src={uploadMedia}
                alt="Attach File"
                className="w-5 h-5 mr-1"
              />
              Media
              <input
                id="fileInput"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Emoji Picker */}
            <button
              type="button"
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
              className="flex items-center text-gray-500 hover:text-gray-800"
            >
              <img src={emoji} alt="Attach File" className="w-5 h-5 mr-1" />
              <span className="ml-1">Emoji</span>
            </button>
            {emojiPickerOpen && (
              <div className="absolute mt-12">
                <EmojiPicker
                  onEmojiClick={(event, emojiObject) =>
                    handleEmojiClick(emojiObject)
                  }
                />
              </div>
            )}

            {/* Post Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
