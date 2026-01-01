import baseApi from "@/shared/api/baseApi.ts";
import { register, login, logout } from "./services.ts";
import getAuthErrorMessage from "./utils/errors.ts";
import type { FirebaseError } from "firebase/app";
import type {
  RegisterParams,
  User,
  AuthApiError,
  LoginParams,
} from "./types.ts";
import { type User as FirebaseUser } from "firebase/auth";
import { setUser } from "@/features/auth/slice.ts";

function handleAuthError(error: FirebaseError) {
  const readableMessage = getAuthErrorMessage(error.code);
  return {
    error: {
      code: error.code,
      message: readableMessage,
    } as AuthApiError,
  };
}

function handleAuthRequest(firebaseUser: FirebaseUser, name: string | null) {
  const data: User = {
    email: firebaseUser.email,
    name: firebaseUser.displayName || name,
    uid: firebaseUser.uid,
    emailVerified: firebaseUser.emailVerified,
  };
  return { data };
}

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, RegisterParams>({
      queryFn: async ({ email, password, name }) => {
        try {
          const firebaseUser = await register({ email, password, name });
          return handleAuthRequest(firebaseUser, name);
        } catch (error) {
          return handleAuthError(error as FirebaseError);
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        console.log("QUERY STARTED START");
        try {
          const { data } = await queryFulfilled;
          console.log("QUERY STARTED DATA", data);
          dispatch(setUser(data));
        } catch (error) {
          handleAuthError(error as FirebaseError);
        }
      },
    }),

    loginUser: builder.mutation<User, LoginParams>({
      queryFn: async ({ email, password }) => {
        try {
          const firebaseUser = await login({ email, password });
          return handleAuthRequest(firebaseUser, null);
        } catch (error) {
          return handleAuthError(error as FirebaseError);
        }
      },
    }),

    logoutUser: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await logout();
          return { data: null };
        } catch (error) {
          return handleAuthError(error as FirebaseError);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = api;
