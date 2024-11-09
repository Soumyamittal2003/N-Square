import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useRef } from "react";
import AuthFooter from "./AuthFooter";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg"; // Adjust path if needed

const VerifyOTP = () => {
  const navigate = useNavigate();

  // Create refs for each input field to manage focus
  const otpRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleVerifyOTP = (values) => {
    const otp = Object.values(values).join("");
    console.log("Complete OTP:", otp);

    // Handle OTP verification logic (e.g., API call)
    navigate("/profile-page-1"); // Redirect to the Profile page after verification
  };

  // Function to handle input change and move focus
  const handleChange = (event, index, setFieldValue) => {
    const { value } = event.target;
    if (value.length === 1 && index < 5) {
      otpRefs[index + 1].current.focus();
    }
    setFieldValue(`otp${index + 1}`, value);
  };

  // Function to handle backspace for focus shift
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !event.target.value) {
      otpRefs[index - 1].current.focus();
    }
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

      {/* Centered Main Content */}
      <div className="w-3/4 max-w-md mx-auto flex flex-col items-center justify-start flex-grow p-4">
        <div className="flex flex-col items-center text-center mb-4">
          <img src={Nsquare} alt="NetworkNext" className="mb-4 w-16 h-16" />
          <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
          <p className="text-center mb-6 text-gray-600 text-sm">
            We've sent a one-time password (OTP) to your registered email
            address. Please check your inbox, including your spam folder, for an
            email from us containing the OTP.
          </p>
        </div>

        <Formik
          initialValues={{
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            otp5: "",
            otp6: "",
          }}
          onSubmit={(values) => handleVerifyOTP(values)}
        >
          {({ setFieldValue }) => (
            <Form className="w-full max-w-xs mx-auto flex justify-center gap-2">
              <div className="flex space-x-2 mb-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Field
                    key={index}
                    name={`otp${index + 1}`}
                    type="text"
                    maxLength="1"
                    innerRef={otpRefs[index]}
                    onChange={(event) =>
                      handleChange(event, index, setFieldValue)
                    }
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className="w-10 h-10 border border-gray-300 rounded text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Verify OTP
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Bottom Toggle Section */}
      <AuthFooter />
    </div>
  );
};

export default VerifyOTP;
