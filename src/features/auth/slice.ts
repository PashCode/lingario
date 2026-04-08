import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  authStatus: "loading",
  googleRedirectStatus: "idle",
};

// authStatus is already done here, we just clear user data.
const clearedUserState: AuthState = {
  ...initialState,
  authStatus: "success",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authStatus = "success";
    },
    setGoogleRedirectStatus: (state, action) => {
      state.googleRedirectStatus = action.payload;
    },
    clearUser: () => clearedUserState,
  },
  selectors: {
    selectUser: (state) => state.user,
    selectAuthStatus: (state) => state.authStatus,
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
