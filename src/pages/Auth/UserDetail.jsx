import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NetworkNextLogo from "../../assets/icons/Network Next.svg";
import OnebyTwoLogo from "../../assets/icons/HalfIcon.svg";
import TwobyTwoLogo from "../../assets/icons/TwobyTwoLogo.svg";
import { FiPaperclip } from "react-icons/fi";
import { LuInfo } from "react-icons/lu";
import CheckmarkAnimation from "../../assets/animations/checkmark.gif";
import axiosInstance from "../../utils/axiosInstance";

const UserDetail = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    dob: "",
    origination: "",
    addressLine1: "",
    state: "",
    city: "",
    zipCode: "",
    gender: "",
    password: "",
    confirmPassword: "",
    registerAs: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    setCurrentStep(2); // Move to ProfilePage2
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post("/users/signup", formData);
      setShowPopup(true); // Show confirmation popup
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to complete signup. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/dashboard"); // Redirect after closing the popup
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto">
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

      {/* Profile Form Section */}
      <div
        className="bg-[#F1F1F1] w-full  max-w-lg mx-auto p-8 rounded-xl shadow-md flex flex-col"
        style={{ borderRadius: "16px" }}
      >
        {currentStep === 1 ? (
          <>
            {/* ProfilePage1 */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">
                Profile
              </h2>
              <img src={OnebyTwoLogo} alt="1/2 completed" />
            </div>
            <form onSubmit={handleSubmitStep1} className="space-y-5">
              <div className="flex flex-row gap-x-5 items-center mb-8">
                <label htmlFor="upload-photo" className="cursor-pointer">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="rounded-full w-20 h-20 object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full border border-gray-300">
                      <FiPaperclip size={24} />
                    </div>
                  )}
                </label>
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Upload your Profile Photo
                </p>
              </div>

              <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-5">
                Basic Information
              </h3>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
              />
              <input
                name="mobileNumber"
                type="text"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
              />
              <input
                name="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
              />
              <select
                name="origination"
                value={formData.origination}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
              >
                <option value="" disabled>
                  Select Origination
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* ProfilePage2 */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">
                Profile
              </h2>
              <img src={TwobyTwoLogo} alt="2/2 completed" />
            </div>
            <form onSubmit={handleSubmitStep2} className="space-y-5">
              <input
                name="addressLine1"
                type="text"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9]"
              />
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9]"
              >
                <option value="" disabled>
                  State
                </option>
                <option value="State1">State1</option>
                <option value="State2">State2</option>
              </select>
              <div className="flex">
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9]"
                />
                <input
                  name="zipCode"
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9]"
                />
              </div>
              <div className="text-lg font-bold">Gender</div>
              <div className="flex gap-5">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9]"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9]"
              />
              <div className="text-lg font-bold">Register as</div>
              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    name="registerAs"
                    value="Student"
                    checked={formData.registerAs === "Student"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Student</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="registerAs"
                    value="Alumni"
                    checked={formData.registerAs === "Alumni"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Alumni</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="registerAs"
                    value="Faculty"
                    checked={formData.registerAs === "Faculty"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Faculty</span>
                </label>
              </div>
              <div className="w-auto flex items-center h-4 text-neutral-400 text-xs font-normal">
                <LuInfo className="mx-1" />
                <span>All information will be recorded</span>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg font-semibold hover:bg-zinc-100-400 transition-colors"
                >
                  &lt; Back
                </button>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md w-[400px] h-[450px] p-8 flex flex-col items-center justify-end relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ✕
            </button>
            {/* Checkmark Animation (GIF or MP4) */}
            <div className="w-36 h-36 mb-4 mt-4">
              <img src={CheckmarkAnimation} alt="Checkmark Animation" />{" "}
              {/* For GIF */}
              {/* Or use <video src={CheckmarkAnimation} autoPlay loop muted className="w-16 h-16" /> for MP4 */}
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Thank You!
            </h2>
            <p className="text-center text-gray-600 text-sm mb-8">
              Thank you for registering with Network_Next. Our team will verify
              your account.
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

export default UserDetail;
