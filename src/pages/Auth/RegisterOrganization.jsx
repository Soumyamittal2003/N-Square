import { useState } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosinstance";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";

const courseOptions = [
  {
    value: "Computer Science and Engineering",
    label: "Computer Science and Engineering",
  },
  { value: "Business Administration", label: "Business Administration" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Psychology", label: "Psychology" },
  { value: "Nursing and Healthcare", label: "Nursing and Healthcare" },
  { value: "Law and Legal Studies", label: "Law and Legal Studies" },
  { value: "Media and Communication", label: "Media and Communication" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Economics", label: "Economics" },
  { value: "Fine Arts and Design", label: "Fine Arts and Design" },
];

const RegisterOrganization = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeAddress: "",
    courses: [],
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (selectedOptions) => {
    setFormData({ ...formData, courses: selectedOptions });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        courses: formData.courses.map((course) => course.value),
      };
      console.log(payload);
      // await axiosInstance.post("/organization/register", payload);
      toast.success("Organization registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to register organization."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto">
        <Link to="/">
          <img src={NetworkNext} alt="Network Next" className="h-5" />
        </Link>
        <button className="p-2 -mr-2">
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Register Form */}
      <div className="w-full max-w-lg flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img src={Nsquare} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">Register Your Organization</h1>
        </div>

        <form onSubmit={handleFormSubmit} className="w-full space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* College Address Field */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              College Address
            </label>
            <input
              type="text"
              name="collegeAddress"
              value={formData.collegeAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your college address"
              required
            />
          </div>

          {/* Courses Multi-Select */}
          <div>
            <label className="block text-sm font-semibold mb-2">Courses</label>
            <Select
              options={courseOptions}
              isMulti
              value={formData.courses}
              onChange={handleCourseChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterOrganization;
