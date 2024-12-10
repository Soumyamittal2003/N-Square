// src/components/DonationContent.jsx

import React from "react";
import FundsCard from "./FundsCard";

const fundData = [
  {
    _id: "1",
    title: "Scholarship Fund",
    organizer: "Alumni Association",
    description: "Supporting students in need through scholarships.",
    goalAmount: 5000,
    fundImage: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    title: "Library Upgrade",
    organizer: "University Library",
    description: "Help us upgrade our library facilities.",
    goalAmount: 10000,
    fundImage: "https://via.placeholder.com/150",
  },
  {
    _id: "3",
    title: "Sports Equipment Fund",
    organizer: "Sports Department",
    description: "Providing new equipment for student athletes.",
    goalAmount: 3000,
    fundImage: "https://via.placeholder.com/150",
  },
  {
    _id: "4",
    title: "Health Services Fund",
    organizer: "Medical Center",
    description: "Improving student health services on campus.",
    goalAmount: 8000,
    fundImage: "https://via.placeholder.com/150",
  },
  {
    _id: "5",
    title: "Technology Upgrade Fund",
    organizer: "IT Department",
    description: "Upgrading campus technology infrastructure.",
    goalAmount: 15000,
    fundImage: "https://via.placeholder.com/150",
  },
];

const DonationContent = () => {
  const handleDonate = (fundId) => {
    console.log(`Donating to fund with ID: ${fundId}`);
    // Implement your donation logic here
  };

  const handleEditFund = (fundId) => {
    console.log(`Editing fund with ID: ${fundId}`);
    // Implement your edit fund logic here
  };

  return (
    <div className="h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Available Funds</h1>
      <div className="h-[80vh] overflow-y-auto flex flex-wrap gap-6 p-2 border rounded-lg bg-white shadow-md">
        {fundData.map((fund) => (
          <FundsCard
            key={fund._id}
            fund={fund}
            currentUserId={"12345"}
            onDonate={handleDonate}
            onEditFund={handleEditFund}
          />
        ))}
      </div>
    </div>
  );
};

export default DonationContent;
