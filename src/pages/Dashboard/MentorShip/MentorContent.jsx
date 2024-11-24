// import React from 'react';
import pic from "../../../assets/icons/pic.svg"
const MentorContent = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 flex items-center w-3/4">
      {/* Left Content */}
      <div className="w-6/9">
        <h2 className="text-2xl font-bold mb-20">DIGITAL ENGAGEMENT PROGRAMS</h2>
        <p className="text-gray-700 text-lg mb-2">Run impactful</p>
        <p className="text-gray-700 text-lg mb-2">mentorship programs</p>
        <p className="text-gray-700 text-lg mb-20">without hassle</p>
        <button className="bg-blue-500 mb-9 text-white px-6 py-2 rounded-md">
          Find  Mentors Group
        </button>
      </div>

      {/* Right Content (Illustration) */}
      <div className="w-1200 h-1200 flex justify-center">
        <img
          src={pic}
          alt="Illustration"
          className="w-1200"
        />
      </div>
    </div>
  );
};

export default MentorContent;
