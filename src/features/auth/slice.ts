import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  status: "loading",
};

const slice = createSlice({
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
  },
  selectors: {
    selectUser: (state) => state.user,
    selectAuthStatus: (state) => state.status,
    selectIsUserAuthenticated: (state) => state.user !== null,
  },
});

export const { setUser, clearUser } = slice.actions;
export const { selectUser, selectAuthStatus, selectIsUserAuthenticated } = slice.selectors;

export default slice.reducer;
