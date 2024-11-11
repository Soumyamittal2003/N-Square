// src/pages/SignupPage.js
import { useState } from "react";

import { X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { authValidationSchema } from "../../utils/ValidationSchema";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";
import SocialLoginButtons from "./SocialLoginBottons";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setEmailError("");

    try {
      // Validate email manually
      const isValid = await authValidationSchema.isValid({ email });
      if (!isValid) {
        setEmailError("Please enter a valid email.");
        return;
      }

      // Navigate to OTP verification page with email state
      navigate("/verify-otp", { state: { email } });
      setEmail(""); // Reset email field
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred");
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
          <h1 className="text-xl font-semibold">Sign up using email</h1>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your email"
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
            {isLoading ? "Sending OTP..." : "Next"}
          </button>
        </form>

        <div className="flex w-full items-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <SocialLoginButtons />
      </div>
      <div className="w-1/2  mx-auto px-6">
        {/* Divider Line */}
        <div className="border-t border-gray-300 my-2"></div>

        {/* Footer Text */}
        <div className="text-center text-gray-600 text-sm mb-6">
          <>
            <Link
              to="/register-as-origination"
              className="text-blue-600 font-medium hover:underline"
            >
              Register Your Origination
            </Link>
            <div>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log In
              </Link>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
