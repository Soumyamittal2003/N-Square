import { createSlice } from "@reduxjs/toolkit";

// Check initial state from localStorage
const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
