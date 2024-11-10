import { useState } from "react";
import { useDispatch } from "react-redux";
import { X, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login, signup } from "../../features/auth/authSlice";
import { authValidationSchema } from "../../utils/ValidationSchema";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";
import SocialLoginButtons from "../../components/SocialLoginBottons";
import AuthFooter from "./AuthFooter";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values, { resetForm }) => {
    const { email } = values;
    try {
      if (isLogin) {
        await dispatch(
          login({
            email,
            password: values.password,
            rememberMe: values.rememberMe,
          })
        );
        resetForm();
        navigate("/feed");
      } else {
        await dispatch(signup({ email }));
        resetForm();
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full  px-6 py-4 mx-auto">
        {/* "Network Next" Logo */}
        <Link to="/">
          <img src={NetworkNext} alt="Network Next" className="h-5" />
        </Link>

        {/* Cross Icon */}
        <button className="p-2 -mr-2">
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Centered Main Content */}
      <div className="w-full max-w-lg flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img src={Nsquare} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">
            {isLogin ? "Log in using email" : "Sign up using email"}
          </h1>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "", // Always provide default values
            rememberMe: false, // Always provide default values
          }}
          validationSchema={authValidationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-1 focus:ring-gray-600 focus:outline-none"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Input for Login */}
              {isLogin && (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 pr-10 focus:ring-1 focus:ring-gray-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </div>
                  )}
                  <a
                    href="forgot-password"
                    className="text-xs text-blue-600 hover:underline  float-right mt-2"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                {isLogin ? "Log In" : "Next"}
              </button>

              {/* Remember Me Checkbox for Login */}
              {isLogin && (
                <div className="flex items-center mt-1">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 text-black border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </div>
              )}
            </Form>
          )}
        </Formik>

        {/* Divider */}
        <div className="flex w-full items-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <SocialLoginButtons />
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthPage;
