import { useState } from "react";
import VolunteerCard from "./VolunteerCard";


const VolunteerContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  

  const volunteerData = [
    {
      functionName: "Teacher’s Day Function",
      date: "12 Nov 2024",
      time: "12:00 PM",
      venue: "place",
      organizer: "Aadarsh",
      contact: "9876543210",
    },
    {
      functionName: "Annual Sports Day",
      date: "20 Dec 2024",
      time: "10:00 AM",
      venue: "place",
      organizer: "Riya",
      contact: "9876541111",
    },
    {
      functionName: "Cultural Fest",
      date: "15 Jan 2025",
      time: "02:00 PM",
      venue: "place",
      organizer: "Rahul",
      contact: "9876542222",
    },
  ];

  
    

  // Filtered data based on the search query
  const filteredData = volunteerData.filter((volunteer) =>
    volunteer.functionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Find a Program"
          className="w-[700px] px-4 py-2 border border-gray-300 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
        
      {/* Volunteer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredData.map((volunteer, index) => (
          <VolunteerCard
            key={index}
            functionName={volunteer.functionName}
            date={volunteer.date}
            time={volunteer.time}
            venue={volunteer.venue}
            organizer={volunteer.organizer}
            contact={volunteer.contact}
          />
        ))}
      </div>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredData.map((volunteer, index) => (
          <VolunteerCard
            key={index}
            functionName={volunteer.functionName}
            date={volunteer.date}
            time={volunteer.time}
            venue={volunteer.venue}
            organizer={volunteer.organizer}
            contact={volunteer.contact}
          />
        ))}
      </div>
    </div>
  );
};

export default VolunteerContent;
