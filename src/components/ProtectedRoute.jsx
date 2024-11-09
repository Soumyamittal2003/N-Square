import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isAuthenticated = true; // For demonstration purposes only

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
