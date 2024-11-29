import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import Image from "../../../assets/icons/logo nsqaure 1.svg"; // Ensure the correct path for the image
import Cookies from "js-cookie";
import axios from "axios";

const Donation = () => {
  const userId = Cookies.get("id");
  const [userData, setUserData] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
  });
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        if (response.data?.success) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount } = formData;
    if (amount && amount > 0) {
      await checkoutHandler(amount);
    } else {
      alert("Please enter a valid amount greater than zero.");
    }
  };

  const checkoutHandler = async (amount) => {
    try {
      setLoading(true); // Set loading state to true when processing starts
      const {
        data: { key },
      } = await axios.get(
        "https://network-next-backend.onrender.com/api/network-next/v1/donation/get-key"
      );
      console.log(key);
      const {
        data: { order },
      } = await axios.post(
        "https://network-next-backend.onrender.com/api/network-next/v1/donation/checkout",
        {
          amount,
        }
      );

      console.log(order);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Network Next",
        description: "Tutorial of RazorPay",
        image: Image, // Corrected the image path
        order_id: order.id,
        callback_url:
          "https://network-next-backend.onrender.com/api/network-next/v1/donation/payment-verfication",
        prefill: {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          contact: userData.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      setLoading(false); // Set loading state to false once Razorpay modal is opened
    } catch (error) {
      console.error("Error in payment processing:", error);
      setLoading(false); // Reset loading state in case of error
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-96 max-w-lg">
        <h2 className="text-3xl text-center font-bold text-gray-900 mb-8">
          Thank you for Donation! 🙏🏻
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Field */}
          <div className="mb-4">
            <label
              htmlFor="formAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              id="formAmount"
              placeholder="Enter the amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full ${loading ? "bg-gray-400" : "bg-zinc-900"} text-white py-3 px-4 rounded-xl text-lg font-medium shadow-md hover:bg-zinc-600`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Processing..." : "Donate Now"}{" "}
            {/* Display loading text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;
