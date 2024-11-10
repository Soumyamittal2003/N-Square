import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "../../assets/images/profile.png";

import NetworkNextLogo from "../../assets/icons/Network Next.svg";
import HalfIcon from "../../assets/icons/HalfIcon.svg";

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
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full  px-6 py-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 flex items-center">
          <img
            src={NetworkNextLogo}
            alt="NetworkNext"
            className="w-32 h-6 lg:w-36 lg:h-8"
          />
        </button>
        <button onClick={() => navigate("/")} className="p-2">
          <span className="text-xl lg:text-2xl font-semibold">✕</span>
        </button>
      </div>

      {/* Profile Form Section */}
      <div
        className="bg-[#F1F1F1] w-1/3 p-8 rounded-md shadow-sm flex flex-col"
        style={{ borderRadius: "16px" }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">
            Profile
          </h2>
          <img src={HalfIcon} alt="1/2 completed" />
        </div>

        {/* Profile Photo Section */}
        <div className="flex items-center mb-8 space-x-4">
          <label htmlFor="upload-photo" className="cursor-pointer">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-full w-20 h-20 lg:w-24 lg:h-24 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-[#EDEDED] rounded-full border border-[#A4A4A4]">
                <img src={Avatar} alt="Upload-image" />
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
          <p className="text-lg text-[#293747]">Upload your Profile Photo</p>
        </div>

        {/* Basic Information Section */}
        <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-6">
          Basic Information
        </h3>

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
          {({ values }) => (
            <Form className="space-y-6">
              {["firstName", "lastName", "mobileNumber", "dateOfBirth"].map(
                (fieldName, index) => (
                  <div key={index} className="relative">
                    <Field
                      name={fieldName}
                      type={fieldName === "dateOfBirth" ? "date" : "text"}
                      placeholder={fieldName.replace(/([A-Z])/g, " $1")}
                      className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FDFDFDE3] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                    />
                    {values[fieldName] && (
                      <label className="absolute  top-[-14px] left-4 text-md text-[#ADB7BD] font-semibold transition-all duration-300 ">
                        {fieldName.replace(/([A-Z])/g, " $1")}
                      </label>
                    )}
                  </div>
                )
              )}

              {/* Select Origination as Dropdown */}
              <div className="relative">
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
                  <option value="option3">Option 3</option>
                </Field>
                {values.origination && (
                  <div className="absolute top-[-14px] left-4 text-md lg:text-sm text-[#ADB7BD] font-semibold transition-all duration-300 mb-2">
                    Select Organization
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-1/3 bg-black  text-white py-2  rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-6"
              >
                Next
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfilePage1;
