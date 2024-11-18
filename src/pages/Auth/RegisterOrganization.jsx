import { X } from "lucide-react";
import { Link } from "react-router-dom";
import NetworkNext from "../../assets/icons/Network Next.svg";
import Nsquare from "../../assets/icons/logo nsqaure 1.svg";

const RegisterOrganization = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black font-sans">
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto">
        <Link to="/">
          <img src={NetworkNext} alt="Network Next" className="h-5" />
        </Link>
        <button className="p-2 -mr-2">
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="w-full max-w-lg flex flex-col items-center flex-grow px-6 pt-4 pb-8">
        <div className="text-center mb-8">
          <img src={Nsquare} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-xl font-semibold">Register Your Organization</h1>
        </div>
        <h1 className="text-9xl text-center font-extrabold">ERROR 404</h1>

        <div className="w-full flex justify-center mt-6">
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Signup
          </Link>
        </div>
      </div>

      <div className="w-1/2 mx-auto px-6">
        {/* Divider Line */}
        <div className="border-t border-gray-300 my-2"></div>

        {/* Footer Text */}
        <div className="text-center text-gray-600 text-sm mb-6">
          <div>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrganization;
