import { Link, useLocation } from "react-router-dom";

const AuthFooter = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border-t border-gray-300 mt-8"></div>
      <p className="text-center text-gray-600 text-sm mt-4 mb-8">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">
              Log In
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthFooter;
