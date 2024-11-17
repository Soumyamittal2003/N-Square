import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";
import SocialLoginButtons from "./SocialLoginBottons";
import CheckmarkAnimation from "../../assets/animations/checkmark.gif"; // Import GIF animation
import { useAuth } from "../../context/AuthProvider";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Track Remember Me
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [loading, setLoading] = useState(false); // Added loader state
  const navigate = useNavigate();
  const auth = useAuth();

  // Validate fields
  const validateFields = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true); // Show loader before starting login process

    try {
      const loginData = { email, password };
      const response = await auth.loginAction(loginData, rememberMe);

      if (response.success) {
        setShowPopup(true); // Show popup on successful login
      } else {
        setServerError(response.message);
      }
    } catch (err) {
      setServerError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Hide loader after processing
    }
  };

  // Handle popup close and navigate to dashboard
  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/dashboard"); // Navigate to dashboard after closing popup
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto">
        <Link to="/">
          <img src={NetworkNext} alt="Network Next" className="h-5" />
        </Link>
        <Link to="/">
          <button className="p-2 -mr-2">
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </Link>
      </div>
      <div className="w-full max-w-lg flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img src={Nsquare} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">Log in using email</h1>
        </div>

        <form onSubmit={handleFormSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg text-black placeholder-gray-400 pr-10 focus:ring-1 focus:ring-gray-600 focus:outline-none`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:underline float-right mt-2"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex items-center mt-1">
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-black border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </div>

          <button
            type="submit"
            className={`w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Processing..." : "Log In"}
          </button>

          {serverError && (
            <p className="text-center text-red-500 mt-4">{serverError}</p>
          )}
        </form>

        <div className="flex w-full items-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <SocialLoginButtons />
      </div>
      <div className="w-1/2 mx-auto px-6">
        <div className="border-t border-gray-300 my-2"></div>
        <div className="text-center text-gray-600 text-sm mb-6">
          <>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md w-[400px] h-[450px] p-8 flex flex-col items-center justify-center relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ✕
            </button>
            {/* Checkmark Animation GIF */}
            <div className="w-36 h-36 mb-6">
              <img
                src={CheckmarkAnimation}
                alt="Checkmark Animation"
                className="w-full h-full"
              />
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Welcome Back!
            </h2>
            <p className="text-center text-gray-600 text-sm mb-8">
              Login successful. Redirecting to your dashboard.
            </p>
            <button
              onClick={handleClosePopup}
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
