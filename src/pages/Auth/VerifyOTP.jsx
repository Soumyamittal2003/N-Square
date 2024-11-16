import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";
import { useAuth } from "../../context/AuthProvider";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { signupEmail } = useAuth(); // Correct hook usage
  const [email] = useState(signupEmail || ""); // Ensure signupEmail fallback
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Initialize as boolean

  const otpRefs = otp.map(() => useRef(null));

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
      await axiosInstance.post("/otp/verify", { email, otp: completeOtp });
      navigate("/user-detail");
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
    if (!/^[0-9]?$/.test(value)) return; // Only allow numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !event.target.value) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.post("/otp/send", { email }); // Pass email instead of signupEmail
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
      <div className="flex items-center justify-between w-full px-6 py-4">
        <button onClick={() => navigate("/")} aria-label="Go back">
          <img src={NetworkNext} alt="Network Next" className="h-5" />
        </button>
        <button onClick={() => navigate("/")} aria-label="Close">
          ✕
        </button>
      </div>

      {/* OTP Verification Form */}
      <div className="w-full max-w-md flex flex-col items-center px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img src={Nsquare} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            {isForgotPassword ? "Reset Your Password" : "Verify Your Email"}
          </h2>
          <p className="text-gray-500">
            Enter the OTP sent to{" "}
            <span className="font-semibold">{email || "your email"}</span>.
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
          className="w-full flex flex-col items-center"
        >
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={otpRefs[index]}
                value={digit}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className="w-14 h-14 px-2.5 py-3 text-center rounded-lg border border-gray-400 text-xl font-semibold focus:outline-none"
                aria-label={`OTP Digit ${index + 1}`}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isLoading
                ? "bg-gray-900 text-white"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {isLoading ? "Wait..." : "Verify OTP"}
          </button>
        </form>

        <button
          className="mt-4 text-blue-600 font-medium hover:underline"
          onClick={handleResendOTP}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
