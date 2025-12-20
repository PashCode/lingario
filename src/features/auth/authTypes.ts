export interface IRegisterParams {
  email: string;
  name: string;
  password: string;
}

export interface IUserProfile {
  email: string;
  name: string;
}

export interface IAuthError {
  code: string | number;
  message: string;
}

export interface IAuthInitialState {
  user: IUserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: IAuthError | null;
}
