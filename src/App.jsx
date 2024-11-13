import { Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  HomePage,
  VerifyOTP,
  UserDetail,
  ForgotPassword,
  RegisterOrganization,
  Dashboard,
} from "./pages/index";
function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/register-organization"
          element={<RegisterOrganization />}
        />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/user-detail" element={<UserDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
