import baseApi from "@/shared/api/baseApi.ts";
import { register } from "./authServices";
import { getAuthErrorMessage } from "./authHelpers";
import type { FirebaseError } from "firebase/app";
import type { UserRegisterData, UserProfileData, AuthError } from "./authTypes";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserProfileData, UserRegisterData>({
      queryFn: async ({ email, name, password }) => {
        try {
          const firebaseUser = await register({ email, name, password });
          const data: UserProfileData = { email, name, uid: firebaseUser.uid };
          return { data };
        } catch (err) {
          const error = err as FirebaseError;
          const readableMessage = getAuthErrorMessage(error.code);
          return {
            error: { code: error.code, message: readableMessage } as AuthError,
          };
        }
      },
    }),
  }),
});

export default authApi;
