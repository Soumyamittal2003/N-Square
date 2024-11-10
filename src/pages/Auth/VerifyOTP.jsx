import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useRef } from "react";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg"; // Adjust path if needed
import NetworkNextLogo from "../../assets/icons/Network Next.svg";

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
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
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

      {/* Centered Main Content */}
      <div className="w-full max-w-md flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img
            src={Nsquare}
            alt="NetworkNext"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
          <p className="text-center mb-6 text-gray-500 text-base leading-relaxed">
            We've sent a one-time password (OTP) to your registered email
            address. Please check your inbox, including your spam folder, for an
            email from us containing the OTP.
          </p>
        </div>
        <div className="text-black self-start  mb-2 text-base font-semibold font-['Open Sans'] leading-snug tracking-tight">
          Enter OTP
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
            <Form className="w-full  mx-auto flex flex-col items-center">
              <div className="flex justify-center gap-3 mb-6">
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
                    className="w-14 h-14 px-2.5 py-3 text-center rounded-lg border border-gray-400 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Verify OTP
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOTP;
