const PostPopup = ({ setPopupOpen }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] shadow-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">What you want to Post</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setPopupOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Post", visibility: "Anyone can view" },
            { label: "Project", visibility: "Followed People can view" },
            { label: "Event", visibility: "Anyone can view" },
            { label: "Story", visibility: "Anyone can view" },
            { label: "Volunteering", visibility: "Anyone can view" },
            { label: "Alma Resources", visibility: "Anyone can view" },
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-between w-full border px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">👤</span>
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <span className="text-xs text-gray-500">{item.visibility}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
