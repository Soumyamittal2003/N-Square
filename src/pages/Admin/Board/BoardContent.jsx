import React, { useState } from "react";

const leaveData = [
  { type: "Students", count: 13 },
  { type: "Alumni", count: 10 },
  { type: "Event Conducted", count: 10 },
  { type: "Event Scheduled", count: 10 },
  { type: "Event Scheduled", count: 10 },
];

const alumniData = [
  {
    batchYear: 2020,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, New York, NY",
  },
  {
    batchYear: 2019,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    address: "456 Oak Avenue, Los Angeles, CA",
  },
  {
    batchYear: 2021,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "555-666-7777",
    address: "789 Pine Road, Chicago, IL",
  },
  {
    batchYear: 2018,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "444-555-6666",
    address: "101 Maple Street, Houston, TX",
  },
];

const BoardContent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-[100%] flex flex-col items-center gap-8 p-4">
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8">
        {leaveData.map((leave, index) => (
          <div
            key={index}
            className="w-48 p-6 border border-gray-300 rounded-lg shadow-md text-center"
          >
            <h2 className="text-lg font-semibold mb-2 truncate">{leave.type}</h2>
            <p className="text-4xl font-bold">{leave.count}</p>
          </div>
        ))}
      </div>

      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4 text-Start"> List</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Batch Year</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumniData.map((alumni, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">{alumni.batchYear}</td>
                    <td className="border border-gray-300 px-4 py-2">{alumni.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{alumni.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{alumni.phone}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => toggleDetails(index)}
                      >
                        {openIndex === index ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  {openIndex === index && (
                    <tr>
                      <td colSpan="5" className="border border-gray-300 p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p><strong>Name:</strong> {alumni.name}</p>
                            <p><strong>Email:</strong> {alumni.email}</p>
                          </div>
                          <div>
                            <p><strong>Address:</strong> {alumni.address}</p>
                            <p><strong>Phone Number:</strong> {alumni.phone}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoardContent;
