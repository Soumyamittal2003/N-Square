// import React from 'react';

const Mentorcard = ({ title, description, buttonLabel }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700 my-4">{description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {buttonLabel}
      </button>
    </div>
  );
};

export default Mentorcard;
