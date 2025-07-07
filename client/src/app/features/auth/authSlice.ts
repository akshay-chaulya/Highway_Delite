import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { verifyLoginOtp, verifySignupOtp } from "./authThunk";

export interface User {
  name: string;
  email: string;
  dob: string;
  token?: string;
  // add other user fields as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  status: "idle",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifySignupOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifySignupOtp.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifySignupOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(verifyLoginOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        if (action.payload?.token) {
          localStorage.setItem('token', action.payload.token);
        }
        state.error = null;
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;