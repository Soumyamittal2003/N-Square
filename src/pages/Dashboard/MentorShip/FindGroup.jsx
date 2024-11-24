// import React from 'react';
// fdfdfdfd
const FindGroup = () => {
  const groups = [
    {
      name: "Soumya",
      description: "We deliver the items very carefully so don't",
      date: "24 June 2024",
      createdBy: "XYZ",
    },
    {
      name: "Soumya",
      description: "We deliver the items very carefully so don't",
      date: "24 June 2024",
      createdBy: "XYZ",
    },
    {
      name: "Soumya",
      description: "We deliver the items very carefully so don't",
      date: "24 June 2024",
      createdBy: "XYZ",
    },
  ];

  return (
    <div className="w-3/4 mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Find Group"
          className="w-full border rounded-md p-2 focus:outline-none"
        />
      </div>

      {/* Group List */}
      <ul className="space-y-4">
        {groups.map((group, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 border rounded-md ${
              index === 1 ? 'border-gray-300' : 'border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gray-300 rounded-full w-12 h-12"></div>
              <div>
                <h3 className="font-bold">{group.name}</h3>
                <p className="text-gray-500">{group.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">{group.date}</p>
              <button className="text-blue-500 text-sm mt-2">Request To Join</button>
              <p className="text-gray-400 text-sm">Created By - {group.createdBy}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindGroup;
