// src/pages/LoginPage.js
import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { authValidationSchema } from "../../utils/ValidationSchema";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";
import SocialLoginButtons from "./SocialLoginBottons";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/home");
    }, 1000);
    setIsLoading(true);
    setError(null);
    setEmailError("");
    setPasswordError("");

    // Manual validation
    try {
      const isValid = await authValidationSchema.isValid({ email, password });
      if (!isValid) {
        if (!authValidationSchema.fields.email.isValidSync(email)) {
          setEmailError("Please enter a valid email.");
        }
        if (!authValidationSchema.fields.password.isValidSync(password)) {
          setPasswordError("Password is required.");
        }
        return;
      }

      // Simulate login logic and redirect
      navigate("/feed");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
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

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 pr-10 focus:ring-1 focus:ring-gray-600 focus:outline-none"
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
            {passwordError && (
              <div className="text-red-500 text-xs mt-1">{passwordError}</div>
            )}
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:underline float-right mt-2"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

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
    </div>
  );
};

export default LoginPage;
