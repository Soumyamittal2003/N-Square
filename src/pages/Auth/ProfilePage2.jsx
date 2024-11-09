import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthFooter from "./AuthFooter";

const ProfilePage2 = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = (values) => {
    console.log("Profile Part 2:", values);
    setShowPopup(true); // Show the popup when "Done" is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/"); // Redirect or navigate to another page if needed
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
          <p className="text-sm text-gray-500">2 / 2 Completed</p>
        </div>

        <Formik
          initialValues={{
            addressLine1: "",
            state: "",
            city: "",
            zipCode: "",
            gender: "",
            password: "",
            confirmPassword: "",
            registerAs: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Form Fields */}
              <div>
                <label className="block text-sm font-semibold">
                  Address Line 1
                </label>
                <Field
                  name="addressLine1"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">State</label>
                <Field
                  as="select"
                  name="state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select State</option>
                  <option value="State1">State1</option>
                  <option value="State2">State2</option>
                </Field>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">City</label>
                  <Field
                    name="city"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">
                    Zip Code
                  </label>
                  <Field
                    name="zipCode"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {/* Other Fields... */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/profile-page-1")}
                  className="text-black hover:underline"
                >
                  {"< Back"}
                </button>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-80 max-w-xs text-center relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Thank you for registering with{" "}
              <span className="font-semibold">Network_Next</span>. Our team will
              properly verify your account.
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

      {/* Footer */}
      <AuthFooter />
    </div>
  );
};

export default ProfilePage2;
