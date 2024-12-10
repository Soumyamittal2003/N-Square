import React from "react";
import FundsCard from "./FundsCard";

const fundData = [
  {
    _id: "1",
    title: "Scholarship Fund",
    description:
      "Supporting students in need through scholarships is our mission. We aim to provide financial assistance to deserving students who excel in academics but lack the necessary resources. Your donation helps build a brighter future for these students..",
    goalAmount: 5000,
    fundImage: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    title: "Library Upgrade",
    description:
      "Supporting students in need through scholarships is our mission. We aim to provide financial assistance to deserving students who excel in academics but lack the necessary resources. Your donation helps build a brighter future for these students.",
    goalAmount: 10000,
    fundImage: "https://via.placeholder.com/150",
  },
  {
    _id: "3",
    title: "Sports Equipment Fund",
    description:
      "Supporting students in need through scholarships is our mission. We aim to provide financial assistance to deserving students who excel in academics but lack the necessary resources. Your donation helps build a brighter future for these students.",
    goalAmount: 3000,
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
    <div className="flex flex-wrap gap-6">
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
  );
};

export default DonationContent;
