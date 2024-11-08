import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useRef } from "react";

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
      // Move to the next input if current input has one character and is not the last input
      otpRefs[index + 1].current.focus();
    }
    setFieldValue(`otp${index + 1}`, value); // Update the value in Formik
  };

  // Function to handle backspace for focus shift
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !event.target.value) {
      // Move to the previous input if backspace is pressed and current input is empty
      otpRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-2xl font-semibold mb-4">Verify your email</h2>
      <p className="text-center mb-4 text-gray-600">
        We've sent a one-time password (OTP) to your email.
      </p>
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
          <Form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Field
                key={index}
                name={`otp${index + 1}`}
                type="text"
                maxLength="1"
                innerRef={otpRefs[index]}
                onChange={(event) => handleChange(event, index, setFieldValue)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className="border rounded w-10 h-10 text-center text-xl"
              />
            ))}
            <button
              type="submit"
              className="w-full mt-6 bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify OTP
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyOTP;
