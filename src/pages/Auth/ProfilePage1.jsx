import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import AuthFooter from "./AuthFooter";
import { useState } from "react";

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
    <div className="h-screen flex flex-col justify-between items-center bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-5/6 mt-1 mx-2 px-4 py-1 ">
        <button onClick={() => navigate(-1)} className="p-2">
          <span className="text-lg font-semibold">{"<"} Network Next</span>
        </button>
        <button onClick={() => navigate("/")} className="p-2">
          <span className="text-lg font-semibold">✕</span>
        </button>
      </div>

      {/* Profile Form Section */}
      <div className="bg-gray-100 rounded-lg shadow-md p-6 w-11/12 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-sm text-gray-500">1 / 2 Completed</p>
        </div>

        <div className="flex flex-col items-center mb-4">
          <label htmlFor="upload-photo" className="cursor-pointer">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-full w-20 h-20 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full border border-gray-400">
                <span className="text-gray-500">Upload your Profile Photo</span>
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
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            mobileNumber: "",
            dateOfBirth: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Last Name</label>
                <Field
                  name="lastName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Mobile Number
                </label>
                <Field
                  name="mobileNumber"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Date of Birth
                </label>
                <Field
                  name="dateOfBirth"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Footer */}
      <AuthFooter />
    </div>
  );
};

export default ProfilePage1;
