import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Login,
  Signup,
  HomePage,
  VerifyOTP,
  UserDetail,
  ForgotPassword,
  RegisterOrganization,
  Dashboard,
  ResetPassword,
  Error404,
} from "./pages/index";
import { Navigate } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");
  return (
    <div className="font-sans max-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <HomePage />}
        />
        s
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/register-organization"
          element={<RegisterOrganization />}
        />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/user-detail" element={<UserDetail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Private Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Fallback Route */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
