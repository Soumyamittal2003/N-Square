import { useState } from "react";

const CreateResources = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fileName: "",
    uploadFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your API logic here
    onClose(); // Close the popup after submission
  };

  const handleDiscard = () => {
    setFormData({
      fileName: "",
      uploadFile: null,
    });
    onClose(); // Close the popup when discard is clicked
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[100%] max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Post Alma Resource
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* File Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              File Name
            </label>
            <input
              type="text"
              name="fileName"
              value={formData.fileName}
              onChange={handleInputChange}
              placeholder="Enter file name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Upload File */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Upload File
            </label>
            <div className="flex justify-between items-center mt-1">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded-lg shadow-sm text-sm text-gray-600 hover:bg-gray-300"
              >
                Dropbox
              </button>
              <label
                htmlFor="uploadFile"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm text-sm cursor-pointer hover:bg-blue-600"
              >
                This device
              </label>
              <input
                id="uploadFile"
                type="file"
                name="uploadFile"
                onChange={handleInputChange}
                className="hidden"
              />
              <button
                type="button"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-sm text-sm hover:bg-yellow-600"
              >
                Google Drive
              </button>
            </div>
          </div>

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
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResources;
