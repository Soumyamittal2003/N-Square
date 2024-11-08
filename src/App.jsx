import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  AuthPage,
  HomePage,
  Feed,
  VerifyOTP,
  ProfilePage1,
} from "./pages/index";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/profile-page-1" element={<ProfilePage1 />} />

      {/* Protected Route */}
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
