import { Link, useLocation } from "react-router-dom";

const AuthFooter = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="w-1/2  mx-auto px-6">
      {/* Divider Line */}
      <div className="border-t border-gray-300 my-2"></div>

      {/* Footer Text */}
      <div className="text-center text-gray-600 text-sm mb-6">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register-as-origination"
              className="text-blue-600 font-medium hover:underline"
            >
              Register Your Origination
            </Link>
            <div>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthFooter;
