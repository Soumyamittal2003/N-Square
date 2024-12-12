import axios from "axios";
import FundsCard from "./FundsCard";

const DonationContent = () => {
  const [funds, setFunds] = React.useState([]); // Manage funds state

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://n-square.onrender.com/api/network-next/v1/funding/get-all-funds"
        );
        if (response.data.success) {
          setFunds(response.data.funds);
        } else {
          console.error("Error fetching funding data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching funding data:", error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []); // Empty dependency array to fetch data only once

  const handleDonate = (fundId) => {
    console.log(`Donating to fund with ID: ${fundId}`);
    // Implement your donation logic here
  };

  const handleEditFund = (fundId) => {
    console.log(`Editing fund with ID: ${fundId}`);
    // Implement your edit fund logic here
  };

  return (
    <div className="flex flex-wrap gap-8 h-[calc(115vh-225px)] overflow-y-auto hide-scrollbar">
      {/* Conditionally render Cards only if funds are available */}
      {funds.length > 0 &&
        funds.map((fund) => (
          <FundsCard
            key={fund._id}
            fund={fund}
            currentUserId={"12345"}
            onDonate={handleDonate}
            onEditFund={handleEditFund}
          />
        ))}
      {/* Display a message if no funds are available */}
      {funds.length === 0 && <p>No funding data available.</p>}
    </div>
  );
};

export default DonationContent;
