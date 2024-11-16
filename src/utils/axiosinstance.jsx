import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://n-square.onrender.com/api/network-next/v1", // Your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token (if available)
axiosInstance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors globally (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
