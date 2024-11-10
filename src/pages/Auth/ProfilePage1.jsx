import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NetworkNextLogo from "../../assets/icons/Network Next.svg";
import OnebyTwoLogo from "../../assets/icons/HalfIcon.svg";
import { FiPaperclip } from "react-icons/fi";

const ProfilePage1 = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (values) => {
    console.log("Profile Part 1:", values);
    navigate("/profile-page-2");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans ">
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

      {/* Profile Form Section */}
      <div
        className="bg-[#F1F1F1] w-full max-w-md mx-auto p-8 rounded-xl shadow-md flex flex-col"
        style={{ borderRadius: "16px" }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">
            Profile
          </h2>
          <img src={OnebyTwoLogo} alt="1/2 completed" />
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            mobileNumber: "",
            dateOfBirth: "",
            origination: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {() => (
            <Form className="space-y-5">
              {/* Profile Photo Section */}
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

              {/* Basic Information Fields */}
              <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-5">
                Basic Information
              </h3>
              <div>
                <Field
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                />
              </div>
              <div>
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                />
              </div>
              <div>
                <Field
                  name="mobileNumber"
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                />
              </div>
              <div>
                <Field
                  name="dateOfBirth"
                  type="date"
                  placeholder="Date of Birth"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                />
              </div>
              <div>
                <Field
                  as="select"
                  name="origination"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                >
                  <option value="" disabled>
                    Select Origination
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </Field>
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfilePage1;
