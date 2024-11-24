const MentorCard = ({ title, description, buttonText }) => {
    
  
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
         
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {buttonText}
        </button>
      </div>
    );
  };
  
  export default MentorCard;