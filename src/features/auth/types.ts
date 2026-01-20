import type { FirebaseError } from "firebase/app";

export interface AuthState {
  user: User | null;
  status: "loading" | "success";
  googleRedirectStatus: "idle" | "loading";
  oxfordDictionary: Array<OxfordDictionaryValues>;
}

export interface OxfordDictionaryValues {
  e: string;
  u: string;
  l: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface User {
  email: string | null;
  name: string | null;
  uid: string;
  emailVerified: boolean;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
}

export interface AuthErrorResponse {
  error: AuthApiError | null;
}

export interface AuthSuccessResponse {
  data: User;
}

export interface AuthApiError {
  code: string;
  message: string;
}

export interface ReauthFormParams {
  handleDelete: (password: string) => Promise<void>
  isLoading: boolean
  onCancel: () => void
}

export function isFirebaseApiError(error: unknown): error is FirebaseError {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    "message" in error
  );
}
