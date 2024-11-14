import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";
import NetworkNextLogo from "../../assets/icons/Network Next.svg";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: null };

  const otpRefs = Array(6)
    .fill()
    .map(() => useRef(null));
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleVerifyOTP = () => {
    console.log("-2");
    const completeOtp = otp.join("");
    console.log("-1");
    console.log("Complete OTP:", completeOtp);
    console.log("0");
    // Handle OTP verification logic (e.g., API call)
    if (from === "forgot-password") {
      console.log("1");
      navigate("/dashboard"); // Redirect to the Dashboard
      console.log("2");
    } else if (from === "signup") {
      console.log("3");
      navigate("/user-detail"); // Redirect to User Detail page
      console.log("4");
    }
  };

  // Function to handle input change and move focus
  const handleChange = (event, index) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if filled
    if (value.length === 1 && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Function to handle backspace for focus shift
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !event.target.value) {
      otpRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full d px-6 py-4 mx-auto">
        <button onClick={() => navigate("/")} className="p-2 flex items-center">
          <img
            className="font-extrabold text-2xl leading-tight tracking-wide"
            src={NetworkNextLogo}
            alt="NetworkNext"
          />
        </button>
        <button onClick={() => navigate("/")} className="p-2">
          <span className="text-2xl font-semibold">✕</span>
        </button>
      </div>

      {/* Centered Main Content */}
      <div className="w-full max-w-md flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img
            src={Nsquare}
            alt="NetworkNext"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
          <p className="text-center mb-6 text-gray-500 text-base leading-relaxed">
            We&apos;ve sent a one-time password (OTP) to your registered email
            address. Please check your inbox, including your spam folder, for an
            email from us containing the OTP.
          </p>
        </div>
        <div className="text-black self-start mb-2 text-base font-semibold font-['Open Sans'] leading-snug tracking-tight">
          Enter OTP
        </div>
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
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
