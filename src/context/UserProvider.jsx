import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
// import axiosInstance from "../utils/axiosinstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const { token } = useAuth(); // Get user from AuthProvider
  const { user } = useAuth(); // Get user from AuthProvider
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Temporarily use the user data from AuthProvider
    if (user) {
      setUserData(user);
      setLoading(false);
    } else {
      setError("No user data available. Please log in.");
      setLoading(false);
    }
  }, [user]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!token) {
  //       setError("No token available. Please log in.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       const response = await axiosInstance.get("/users/me"); // Fetch user data
  //       setUserData(response.data.user); // Store user data in state
  //       setError(null); // Clear any previous errors
  //     } catch (error) {
  //       const errorMessage =
  //         error.response?.data?.message || "Failed to fetch user data.";
  //       console.error("Error fetching user data:", errorMessage);
  //       setError(errorMessage);
  //       setUserData(null);
  //     } finally {
  //       setLoading(false); // Mark loading as complete
  //     }
  //   };

  //   fetchUserData();
  // }, [token]);
  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
