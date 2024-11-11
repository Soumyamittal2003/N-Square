import { Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  HomePage,
  VerifyOTP,
  Feed,
  UserDetail,
} from "./pages/index";
function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/user-detail" element={<UserDetail />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
