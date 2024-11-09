import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  AuthPage,
  HomePage,
  Feed,
  VerifyOTP,
  ProfilePage1,
  ProfilePage2,
} from "./pages/index";
function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/profile-page-1" element={<ProfilePage1 />} />
        <Route path="/profile-page-2" element={<ProfilePage2 />} />

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
    </div>
  );
}

export default App;
