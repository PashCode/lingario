import baseApi from "@/shared/api/baseApi";
import {
  ensureUserDoc,
  deleteAccount,
  login,
  loginAnonymously,
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
import {
  setIsOxford3000DictLoading,
  setOxford3000,
} from "@/features/dictionaries/slice";
import { isFirebaseError } from "./types.ts";
import getOrSetStorage from "@/shared/utils/storageAndSession/getOrSetStorage";
import { LSOxford3000Config } from "@/features/dictionaries/utils/constants";
import { LSHomepageAISentenceConfig } from "@/features/home/utils/constants";
import {
  setHomepageAISentence,
  setHomepageAISentenceStatus,
} from "@/features/home/slice";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";

function handleAuthError(error: unknown): AuthErrorResponse {
  const code = isFirebaseError(error) ? error.code : "auth/unexpected-error";

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
        // after register we preload main data here, because listener may wait for displayName update.
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          await ensureUserDoc(data.uid);
        } catch (error) {
          console.error(error);
          return;
        }

        dispatch(setHomepageAISentenceStatus("loading"));
        try {
          const homepageAISentence = await getOrSetStorage(
            LSHomepageAISentenceConfig,
          );
          dispatch(setHomepageAISentence(homepageAISentence));
          dispatch(setHomepageAISentenceStatus("success"));
        } catch (error) {
          console.error(error);
          dispatch(setHomepageAISentenceStatus("error"));
        }

        dispatch(setIsOxford3000DictLoading("loading"));
        try {
          const oxford3000 = await getOrSetStorage(LSOxford3000Config);
          dispatch(setOxford3000(oxford3000));
          dispatch(setIsOxford3000DictLoading("success"));
        } catch (error) {
          console.error(error);
          dispatch(setIsOxford3000DictLoading("error"));
        }
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

    loginAnonymous: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await loginAnonymously();
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
          return { data: null };
        } catch (error) {
          return handleAuthError(error);
        }
      },
    }),

    reauthDeleteAccount: builder.mutation<null, string>({
      queryFn: async (password) => {
        try {
          const currentUser = requireCurrentUser();

          // anonymous user does not need reauth, so we skip straight to deleteAccount mutation in the hook.
          if (currentUser.isAnonymous) {
            return { data: null };
          }

          const providerId = currentUser.providerData[0].providerId;
          if (providerId === "password") await reauthDeleteWithPassword(password);
          if (providerId === "google.com") await reauthDeleteWithGoogle();
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
  useLoginAnonymousMutation
} = authApi;
