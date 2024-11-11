// utils/auth.js
export const isTokenExpired = (token) => {
  if (!token) return true; // No token means expired
  const payload = JSON.parse(atob(token.split(".")[1])); // Decode the payload
  return payload.exp * 1000 < Date.now(); // Check if the expiration time has passed
};
