import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser =
      sessionStorage.getItem("user") || localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || localStorage.getItem("token");
  });
  const [signupEmail, setSignupEmail] = useState(null);

  const navigate = useNavigate();

  const loginAction = async (loginData, rememberMe) => {
    try {
      const response = await axiosInstance.post("/users/login", loginData);
      const { user: userData, token: userToken } = response.data;

      setToken(userToken); // Set token in state
      setUser(userData); // Set user data in state

      const storage = rememberMe ? localStorage : sessionStorage;

      // Store token and user data
      storage.setItem("token", userToken);
      storage.setItem("user", JSON.stringify(userData));

      if (rememberMe) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 20); // Token expiry for "Remember Me"
        localStorage.setItem("tokenExpiry", expiryDate.toISOString());
      } else {
        sessionStorage.removeItem("tokenExpiry"); // Clear expiry for session-only login
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      console.error("Login error:", errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  const setEmailAction = (userEmail) => {
    setSignupEmail(userEmail); // Function to set email
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    sessionStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    navigate("/login");
  };

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    if (expiry && new Date(expiry) <= new Date()) {
      logOut(); // Logout if token has expired
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loginAction, logOut, signupEmail, setEmailAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
