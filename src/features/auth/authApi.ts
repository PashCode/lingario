import baseApi from "@/shared/api/baseApi";
import {
  deleteAccount,
  login,
  logout,
  reauthDeleteWithGoogle,
  reauthDeleteWithPassword,
  register,
} from "./services";
import getAuthErrorMessage from "./utils/errors";
import type {
  LoginParams,
  RegisterParams,
  User,
  AuthErrorResponse,
  AuthSuccessResponse,
} from "./types.ts";
import { type User as FirebaseUser } from "firebase/auth";
import { setUser } from "@/features/auth/slice";
import { setOxford3000 } from "@/features/dictionary/slice";
import { auth } from "@/config/firebase";
import { isFirebaseApiError } from "./types.ts";
import getStorageOrFetch from "@/utils/getStorageOrFetch";
import { LSOxford3000Config } from "@/features/dictionary/utils/constants";
import { LSAIEverydayPhraseConfig } from "@/features/home/utils/constants";
import { setAIEverydayPhrase } from "@/features/home/slice";

function handleAuthError(error: unknown): AuthErrorResponse {
  const code = isFirebaseApiError(error) ? error.code : "auth/unexpected-error";

  return {
    error: {
      code,
      message: getAuthErrorMessage(code),
    },
  };
}

function handleAuthRequest(
  firebaseUser: FirebaseUser,
  name: string | null,
): AuthSuccessResponse {
  const data = {
    email: firebaseUser.email,
    name: firebaseUser.displayName || name,
    uid: firebaseUser.uid,
    emailVerified: firebaseUser.emailVerified,
  };

  return { data };
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, RegisterParams>({
      queryFn: async ({ email, password, name }) => {
        try {
          const firebaseUser = await register({ email, password, name });
          return handleAuthRequest(firebaseUser, name);
        } catch (error) {
          return handleAuthError(error);
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data));

        const AIEverydayPhrase = await getStorageOrFetch(LSAIEverydayPhraseConfig);
        dispatch(setAIEverydayPhrase(AIEverydayPhrase));

        const oxford3000 = await getStorageOrFetch(LSOxford3000Config);
        dispatch(setOxford3000(oxford3000));
      },
    }),

    loginUser: builder.mutation<null, LoginParams>({
      queryFn: async ({ email, password }) => {
        try {
          await login({ email, password });
          return { data: null };
        } catch (error) {
          return handleAuthError(error);
        }
      },
    }),

    logoutUser: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await logout();
          return { data: null };
        } catch (error) {
          return handleAuthError(error);
        }
      },
    }),

    deleteAccount: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await deleteAccount();
          localStorage.removeItem("oxford-dictionary");
          localStorage.removeItem("AI-everyday-phrase");
          return { data: null };
        } catch (error) {
          return handleAuthError(error);
        }
      },
    }),

    reauthDeleteAccount: builder.mutation<null, string>({
      queryFn: async (password) => {
        try {
          const providerId = auth.currentUser!.providerData[0].providerId;
          if (providerId === "password")
            await reauthDeleteWithPassword(password);
          if (providerId === "google.com") await reauthDeleteWithGoogle();
          localStorage.removeItem("oxford-dictionary");
          localStorage.removeItem("AI-everyday-phrase");
          return { data: null };
        } catch (error) {
          return handleAuthError(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteAccountMutation,
  useReauthDeleteAccountMutation,
} = authApi;
