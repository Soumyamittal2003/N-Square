import { useState } from "react";
import { useDispatch } from "react-redux";
import { X, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short").required("Required"),
  });

  const handleFormSubmit = (values) => {
    if (isLogin) {
      dispatch(login(values)); // Redux action for login
    } else {
      dispatch(signup(values)); // Redux action for signup
    }
  };

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 lg:p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-bold">Network Next</div>
          <button className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold">N²</div>
          <h2 className="text-2xl font-semibold mt-4">
            {isLogin ? "Log in using email" : "Sign up using email"}
          </h2>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
              </div>

              {isLogin && (
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Bottom Link */}
        <p className="text-center text-gray-600 text-sm mt-8">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="text-blue-600 hover:underline"
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
