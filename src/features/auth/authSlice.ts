import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FirebaseError } from "firebase/app";
import { current } from "@reduxjs/toolkit";
import { getAuthErrorMessage } from "./authHelpers";
import { register } from "@/features/auth/authServices";
import type {
  AuthError,
  AuthInitialState,
  UserRegisterData,
  UserProfileData,
} from "./authTypes";

const initialState: AuthInitialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isSubmitting: false,
  serverError: null,
};

export const registerUser = createAsyncThunk<
  UserProfileData,
  UserRegisterData,
  { rejectValue: AuthError }
>(
  "auth/registerUser",
  async ({ email, password, name }: UserRegisterData, { rejectWithValue }) => {
    try {
      const firebaseUser = await register({ email, name, password });
      return { email, name, uid: firebaseUser.uid };
    } catch (err) {
      const error = err as FirebaseError;
      const readableErrorMessage = getAuthErrorMessage(error.code);
      return rejectWithValue({
        code: error.code,
        message: readableErrorMessage,
      });
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },

  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.isSubmitting = true;
      // state.isLoading = true;
      state.serverError = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isSubmitting = false;
      // state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.payload) state.serverError = action.payload;
      state.isSubmitting = false;
      // state.isLoading = false;
      console.log(current(state));
    });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
