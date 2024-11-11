import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  appleProvider,
} from "../../config/firebase";

import GoogleIcon from "../../assets/icons/Google Icon.svg";
import FacebookIcon from "../../assets/icons/FaceBook Icon.svg";
import XIcon from "../../assets/icons/Twitter Icon.svg";
import AppleIcon from "../../assets/icons/Apple Icon.svg";

const SocialLoginButtons = () => {
  const handleSocialLogin = (provider) => {
    if (!auth || !provider) {
      console.warn(
        "Firebase is not initialized. Please set up Firebase to use social login."
      );
      return;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
      <button
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        onClick={() => handleSocialLogin(googleProvider)}
        disabled={!googleProvider}
      >
        <img src={GoogleIcon} alt="google-icon" className="" />{" "}
        <span>Sign in with Google</span>
      </button>
      <button
        onClick={() => handleSocialLogin(appleProvider)}
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        disabled={!appleProvider}
      >
        <img src={AppleIcon} alt="google-icon" className="" />{" "}
        <span>Sign in with Apple</span>
      </button>
      <button
        onClick={() => handleSocialLogin(twitterProvider)}
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        disabled={!twitterProvider}
      >
        <img src={XIcon} alt="google-icon" className="" />{" "}
        <span>Sign in with X</span>
      </button>
      <button
        onClick={() => handleSocialLogin(facebookProvider)}
        className="flex items-center justify-center border border-gray-300 rounded-lg py-2 space-x-2 w-full"
        disabled={!facebookProvider}
      >
        <img src={FacebookIcon} alt="google-icon" className="" />{" "}
        <span>Sign in with Facebook</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
