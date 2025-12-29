export interface AuthInitialState {
  user: UserProfileData | null;
  isAuthenticated: boolean;
}

export interface UserRegisterData {
  email: string;
  name: string;
  password: string;
}

export interface UserProfileData {
  email: string | null;
  name: string | null;
  uid: string | null;
}

export interface AuthError {
  code: string | number;
  message: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
}

export interface AlertProps {
  errorText: string | null;
}

