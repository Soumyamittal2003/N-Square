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
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <div className="font-sans">
      <AuthProvider>
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
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
