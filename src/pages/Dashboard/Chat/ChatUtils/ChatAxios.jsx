import axios from "axios";

const chatAxios = axios.create({
  baseURL: "https://network-next-backend.onrender.com/api/network-next/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token (if available)
chatAxios.interceptors.request.use((config) => {
  return config;
});

// Add a response interceptor to handle errors globally (optional)
chatAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default chatAxios;
