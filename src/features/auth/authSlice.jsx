import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Logging in with user data:", userData);
      return { message: "Login successful", user: userData };
    } catch (error) {
      return rejectWithValue(error.message); // Send only the error message
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
      return { message: "Signup successful", user: userData };
    } catch (error) {
      return rejectWithValue(error.message); // Send only the error message
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      console.log("Logging out");
      state.user = null;
      state.isLoading = false;
      state.error = null;
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
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to log in"; // Fallback error message
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to sign up"; // Fallback error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
