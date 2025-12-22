export interface AuthInitialState {
  user: UserProfileData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}

export interface UserRegisterData {
  email: string;
  name: string;
  password: string;
}

export interface UserProfileData {
  email: string | null;
  name: string | null;
  uid: string| null;
}

export interface AuthError {
  code?: string | number;
  message: string;
}
