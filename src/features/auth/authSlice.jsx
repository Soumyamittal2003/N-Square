import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://network-next-backend.onrender.com/api/network-next/v1/otp/send",
        { email }
      );

      if (response.data.success) {
        return response.data; // Return response data if successful
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to send OTP"
      );
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://network-next-backend.onrender.com/api/network-next/v1/otp/verify",
        { email, otp }
      );

      if (response.data.success) {
        return response.data; // Return response data if successful
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to verify OTP"
      );
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://network-next-backend.onrender.com/api/network-next/v1/users/login",
        { email, password }
      );

      // Check if the response is successful
      if (response.data.success) {
        // Store token based on rememberMe
        if (rememberMe) {
          localStorage.setItem("token", response.data.token);
        } else {
          sessionStorage.setItem("token", response.data.token);
        }

        return {
          message: response.data.message,
          user: response.data.user,
          token: response.data.token,
        };
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to log in");
    }
  }
);

// Async thunk for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    console.log("Inside signup thunk with userData:", userData);
    try {
      console.log("Signing up with user data:", userData);
      const response = await axios.post(
        "https://network-next-backend.onrender.com/api/network-next/v1/users/signup",
        {
          email: userData.email,
          password: userData.password,
          role: userData.role,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          address: userData.address,
          gender: userData.gender,
          dob: userData.dob,
          state: userData.state,
          city: userData.city,
          zipCode: userData.zipCode,
          imageUrl: userData.imageUrl,
        }
      );
      return { message: "Signup successful", user: response.data.user }; // Adjust based on your API response
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to sign up"
      ); // Send only the error message
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false, // Add this line
  },
  reducers: {
    logout: (state) => {
      console.log("Logging out");
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false; // Reset authentication status
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Store user data
        state.token = action.payload.token; // Store token
        state.isAuthenticated = true; // Set to true on successful login
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to log in"; // Fallback error message
      })
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to send OTP";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
