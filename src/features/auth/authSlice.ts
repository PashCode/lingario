import { createSlice } from "@reduxjs/toolkit";
import type { AuthInitialState } from "./authTypes";

const initialState: AuthInitialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated
  }
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
