import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  status: "loading",
  googleRedirectStatus: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "success";
    },
    setGoogleRedirectStatus: (state, action) => {
      state.googleRedirectStatus = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectAuthStatus: (state) => state.status,
    selectIsUserAuthenticated: (state) => state.user !== null,
    selectGoogleRedirectStatus: (state) => state.googleRedirectStatus,
  },
});

export const {
  setUser,
  clearUser,
  setGoogleRedirectStatus,
} = authSlice.actions;

export const {
  selectUser,
  selectAuthStatus,
  selectIsUserAuthenticated,
  selectGoogleRedirectStatus,
} = authSlice.selectors;

export default authSlice.reducer;
