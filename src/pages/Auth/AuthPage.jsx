import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { X, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import React Router hooks
import { login, signup } from "../../features/auth/authSlice";
import { authValidationSchema } from "../../utils/ValidationSchema";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";
import SocialLoginButtons from "../../components/SocialLoginBottons";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial auth mode based on the current path
  const initialMode = location.pathname === "/signup" ? false : true;
  const [isLogin, setIsLogin] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Update URL based on the authentication mode
    if (isLogin) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  }, [isLogin, navigate]);

  const handleFormSubmit = (values) => {
    if (isLogin) {
      dispatch(login(values));
    } else {
      dispatch(signup(values));
    }
  };

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="h-screen flex flex-col justify-between items-center bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-5/6 mt-4 mx-2 px-4 py-2 ">
        <img src={NetworkNext} alt="NetworkNext" className="w-auto h-8" />
        <Link to={"/"}>
          <button className="p-2">
            <X className="w-6 h-6" />
          </button>
        </Link>
      </div>

      {/* Centered Main Content */}
      <div className="w-3/4 max-w-md mx-auto flex flex-col items-center justify-center flex-grow p-4">
        <div className="flex flex-col items-center text-center mb-8">
          <img src={Nsquare} alt="NetworkNext" className="mb-4" />
          <h1 className="text-2xl font-semibold">
            {isLogin ? "Log in using email" : "Sign up using email"}
          </h1>
        </div>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={authValidationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 w-full">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {isLogin && (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
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
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                  <a
                    href="#"
                    className="text-sm text-black hover:underline mt-3 float-right"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
              >
                {isLogin ? "Log In" : "Next"}
              </button>

              {/* Remember me checkbox for login mode */}
              {isLogin && (
                <div className="flex items-center mt-3">
                  <label className="flex items-center cursor-pointer">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      className="h-4 w-4 text-white bg-white border-gray-300 rounded focus:ring-0 cursor-pointer checked:bg-black checked:border-transparent"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                </div>
              )}
            </Form>
          )}
        </Formik>

        {/* Divider and Social Login Buttons */}
        <div className="flex w-full items-center my-6">
          <div className="w-full border-t  border-gray-400"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="w-full border-t border-gray-400"></div>
        </div>
        <SocialLoginButtons />
      </div>

      {/* Bottom Toggle Section */}
      <div className="w-full max-w-md mx-auto">
        <div className="border-t border-gray-300 mt-8"></div>
        <p className="text-center text-gray-600 text-sm mt-4 mb-8">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-black font-bold hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-black font-bold hover:underline"
              >
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
