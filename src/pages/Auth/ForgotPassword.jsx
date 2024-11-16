import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance.jsx";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setEmailError("");

    try {
      // Send email to the backend to generate OTP
      await axiosInstance.post("/otp/send", { isForgotPassword });
      navigate("/verify-otp", { state: { isForgotPassword } }); // Navigate to Verify OTP page with email
      setIsForgotPassword;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto">
        <Link to="/">
          <img src={NetworkNext} alt="Network Next" className="h-5" />
        </Link>
        <button className="p-2 -mr-2">
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="w-full max-w-lg flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img src={Nsquare} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">Forgot Password</h1>
        </div>

        {error && (
          <div className="w-full bg-red-500 text-white text-center p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={isForgotPassword}
              onChange={(e) => setIsForgotPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <div className="text-red-500 text-xs mt-1">{emailError}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {isLoading ? "Sending Reset OTP..." : "Next"}
          </button>
        </form>

        <div className="w-full flex justify-center mt-6">
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
