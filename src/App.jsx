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
import PrivateRoute from "./utils/PrivateRoute";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <div className="font-sans">
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
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

          {/* Private Routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <UserProvider>
                  <Dashboard />
                </UserProvider>
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
