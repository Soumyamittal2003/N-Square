import { useState } from "react";
import EventCard from "./EventCard";
import event1 from "../../../assets/images/event-image.jpg";

const EventContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Alumni", "Faculty", "Student"];
  const sessions = [
    {
      image: event1,
      title: "Learning Technical Analysis",
      speaker: "Aadarsh Soni",
      date: "Mar 1, 2024",
      time: "12:00 PM",
      tags: ["Indices", "Stocks", "Crypto"],
      attending: "18,76,788",
      link: "https://www.youtube.com/watch?v=ZieW_OSkuiQ",
    },
    {
      image: event1,
      title: "Fundamentals of Stock Trading",
      speaker: "Abhinav Sharma",
      date: "Mar 1, 2024",
      time: "12:00 PM",
      tags: ["Indices", "Stocks", "Crypto"],
      attending: "18,76,788",
      link: "https://www.youtube.com/watch?v=ZieW_OSkuiQ",
    },
    {
      image: event1,
      title: "Share Markets Webinar",
      speaker: "Moon Soni",
      date: "Mar 1, 2024",
      time: "12:00 PM",
      tags: ["Indices", "Stocks", "Crypto"],
      attending: "18,76,788",
      link: "https://www.youtube.com/watch?v=ZieW_OSkuiQ",
    },
  ];

  return (
    <div className="w-full lg:w-[75%] px-4 lg:px-6">
      {/* Tabs Section */}
      <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-full font-semibold ${
              activeTab === tab ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Content */}
      <div className="p-4">
        {/* Section: Sessions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Sessions</h2>
            <button className="text-sm font-semibold text-blue-500 hover:underline">
              Explore All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>

        {/* Section: Workshops */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Workshops</h2>
            <button className="text-sm font-semibold text-blue-500 hover:underline">
              Explore All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventContent;
