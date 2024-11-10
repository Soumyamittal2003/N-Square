import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NetworkNextLogo from "../../assets/icons/Network Next.svg";
import TwobyTwoLogo from "../../assets/icons/TwobyTwoLogo.svg";
import { LuInfo } from "react-icons/lu";

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
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full px-6 py-4 ">
        <button onClick={() => navigate("/")} className="p-2 flex items-center">
          <img src={NetworkNextLogo} alt="NetworkNext" className="w-36 h-6" />
        </button>
        <button onClick={() => navigate("/")} className="p-2">
          <span className="text-2xl font-semibold">✕</span>
        </button>
      </div>

      {/* Profile Form Section */}
      <div
        className="bg-[#F1F1F1] w-auto mx-auto  p-8 rounded-xl shadow-md flex flex-col"
        style={{ borderRadius: "16px" }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">
            Profile
          </h2>
          <img src={TwobyTwoLogo} alt="2/2 completed" />
        </div>

        <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-5">
          Address Details
        </h3>

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
            <Form className="space-y-5">
              {/* Address Fields */}
              <div>
                <Field
                  name="addressLine1"
                  type="text"
                  placeholder="Address Line 1"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                />
              </div>
              <div>
                <Field
                  as="select"
                  name="state"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000]"
                >
                  <option value="" disabled>
                    State
                  </option>
                  <option value="State1">State1</option>
                  <option value="State2">State2</option>
                </Field>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Field
                    name="city"
                    type="text"
                    placeholder="City"
                    className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                  />
                </div>
                <div className="flex-1">
                  <Field
                    name="zipCode"
                    type="text"
                    placeholder="Zip Code"
                    className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Gender Radio Buttons */}
              <h4 className="text-lg font-bold">Gender</h4>
              <div className="flex gap-5 items-center">
                <label className="flex items-center">
                  <Field type="radio" name="gender" value="Male" />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <Field type="radio" name="gender" value="Female" />
                  <span className="ml-2">Female</span>
                </label>
              </div>

              {/* Password Fields */}
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                />
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-[#EEEEEE] rounded-lg bg-[#FBF8F9] text-base lg:text-lg text-[#000000] placeholder-gray-400"
                />
              </div>

              {/* Register As Radio Buttons */}
              <h4 className="text-lg font-bold">Register as</h4>
              <div className="flex gap-6 items-center">
                <label className="flex items-center">
                  <Field type="radio" name="registerAs" value="Student" />
                  <span className="ml-2">Student</span>
                </label>
                <label className="flex items-center">
                  <Field type="radio" name="registerAs" value="Alumni" />
                  <span className="ml-2">Alumni</span>
                </label>
                <label className="flex items-center">
                  <Field type="radio" name="registerAs" value="Faculty" />
                  <span className="ml-2">Faculty</span>
                </label>
              </div>

              <div className="w-48 h-4 flex  text-neutral-400 text-xs font-normal font-['Open Sans']">
                <LuInfo className="mx-1" /> All information will be recoded
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/profile-page-1")}
                  className="mx-2 py-2 px-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
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
          <div className="bg-white rounded-lg shadow-md w-[400px] h-[450px] p-8 flex flex-col items-center justify-end relative">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ✕
            </button>

            {/* Thank You Message */}
            <h2 className="text-xl font-semibold mb-2 mt-8 text-center">
              Thank You!
            </h2>
            <p className="text-center text-gray-600 text-sm mb-8">
              Thank you for registering with{" "}
              <span className="font-semibold">Network_Next</span>. <br />
              Our team will properly verify your account.
            </p>

            {/* Continue Button */}
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

export default ProfilePage2;
