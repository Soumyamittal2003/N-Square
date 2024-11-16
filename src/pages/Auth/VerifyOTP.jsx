import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, isForgotPassword } = location.state || {}; // Determine the purpose of OTP verification
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const otpRefs = Array(6)
    .fill()
    .map(() => useRef(null));

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError(null);

    const completeOtp = otp.join("");
    if (completeOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      setIsLoading(false);
      return;
    }

    try {
      // Send OTP and email to backend for verification
      await axiosInstance.post("/otp/verify", { email, otp: completeOtp });

      if (isForgotPassword) {
        // Forgot Password Flow
        navigate("/reset-password", { state: { email } }); // Redirect to Reset Password page
      } else {
        // Signup Flow
        navigate("/user-detail", { state: { email } }); // Redirect to User Detail page
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event, index) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      otpRefs[index + 1].current.focus(); // Move to next input
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !event.target.value) {
      otpRefs[index - 1].current.focus(); // Move to previous input
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.post("/otp/send", { email });
      alert("OTP resent successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto">
        <button onClick={() => navigate("/")} className="p-2">
          <img src={NetworkNext} alt="Network Next" className="h-5" />
        </button>
        <button onClick={() => navigate("/")} className="p-2">
          ✕
        </button>
      </div>

      {/* OTP Verification Form */}
      <div className="w-full max-w-md flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img src={Nsquare} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            {isForgotPassword ? "Reset Your Password" : "Verify Your Email"}
          </h2>
          <p className="text-gray-500 mb-6">
            Enter the OTP sent to <span className="font-semibold">{email}</span>
            .
          </p>
        </div>

        {error && (
          <div className="w-full bg-red-500 text-white text-center p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOTP();
          }}
          className="w-full mx-auto flex flex-col items-center"
        >
          <div className="flex justify-center gap-3 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={otpRefs[index]}
                value={otp[index]}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className="w-14 h-14 px-2.5 py-3 text-center rounded-lg border border-gray-400 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {isLoading ? "Wait..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4">
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={handleResendOTP}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
