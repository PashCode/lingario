export interface AuthState {
  user: User | null;
  status: "loading" | "success";
  googleRedirectStatus: "idle" | "loading"
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
  uid: string | null;
  emailVerified: boolean;
}

export interface AuthApiError {
  code: string;
  message: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string ;
  name?: string ;
}
