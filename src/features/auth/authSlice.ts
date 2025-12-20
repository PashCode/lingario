import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authServices.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FirebaseError } from "firebase/app";
import type {
  IAuthInitialState,
  IRegisterParams,
  IAuthError,
} from "./authTypes.ts";

// import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthInitialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }: IRegisterParams, { rejectWithValue }) => {
    try {
      await register(email, password);
      return { email, name };
    } catch (err) {
      const error = err as FirebaseError;
      return rejectWithValue({
        code: error.code,
        message: "Failed register",
      });
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state, action) {
      state.isAuthenticated = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as IAuthError;
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
