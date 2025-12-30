import baseApi from "@/shared/api/baseApi.ts";
import { register } from "./services.ts";
import { getAuthErrorMessage } from "./utils/helpers.ts";
import type { FirebaseError } from "firebase/app";
import type { RegisterParams, User, AuthApiError } from "./types.ts";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, RegisterParams>({
      queryFn: async ({ email, name, password }) => {
        try {
          const firebaseUser = await register({ email, name, password });
          const data: User = { email, name, uid: firebaseUser.uid };
          return { data };
        } catch (err){
          const error = err as FirebaseError;
          const readableMessage = getAuthErrorMessage(error.code);
          return {
            error: {
              code: error.code,
              message: readableMessage,
            } as AuthApiError,
          };
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation } = api;
