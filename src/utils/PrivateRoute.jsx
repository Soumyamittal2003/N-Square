import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  return token ? children || <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
