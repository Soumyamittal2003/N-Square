import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  appleProvider,
} from "../config/firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { FaGoogle, FaFacebook, FaTwitter, FaApple } from "react-icons/fa";

const SocialLoginButtons = () => {
  const dispatch = useDispatch();

  const handleSocialLogin = (provider) => {
    // Check if Firebase is initialized
    if (!auth || !provider) {
      console.warn(
        "Firebase is not initialized. Please set up Firebase to use social login."
      );
      return;
    }

    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.error("Social login error:", error);
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
      <button
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        onClick={() => handleSocialLogin(googleProvider)}
        disabled={!googleProvider}
      >
        <FaGoogle className="text-red-500" /> {/* Google Icon */}
        <span>Sign in with Google</span>
      </button>
      <button
        onClick={() => handleSocialLogin(appleProvider)}
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        disabled={!appleProvider}
      >
        <FaApple className="text-black" /> {/* Apple Icon */}
        <span>Sign in with Apple</span>
      </button>
      <button
        onClick={() => handleSocialLogin(twitterProvider)}
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        disabled={!twitterProvider}
      >
        <FaTwitter className="text-blue-400" /> {/* Twitter Icon */}
        <span>Sign in with Twitter</span>
      </button>
      <button
        onClick={() => handleSocialLogin(facebookProvider)}
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        disabled={!facebookProvider}
      >
        <FaFacebook className="text-blue-600" /> {/* Facebook Icon */}
        <span>Sign in with Facebook</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
