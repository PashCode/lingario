import { AUTH_ERRORS } from "./constants";
import type {
  LoginParams,
  RegisterParams,
  ValidationErrors,
} from "@/features/auth/types";
import getAuthErrorMessage from "@/features/auth/utils/errors";

function getEmailError(email: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-ЯіІїЇєЄґҐ]{2,}$/;

  if (!email.trim())
    return getAuthErrorMessage(AUTH_ERRORS.VALIDATION_EMAIL_REQUIRED);
  if (!emailRegex.test(email))
    return getAuthErrorMessage(AUTH_ERRORS.INVALID_EMAIL);
}

function getPasswordError(password: string): string | undefined {
  if (!password)
    return getAuthErrorMessage(AUTH_ERRORS.MISSING_PASSWORD);
  if (password.includes(' '))
    return getAuthErrorMessage(AUTH_ERRORS.NO_SPACES_PASSWORD)
  if (password.length < 6)
    return getAuthErrorMessage(AUTH_ERRORS.WEAK_PASSWORD);
}

function getNameError(name: string): string | undefined {
  if (!name.trim())
    return getAuthErrorMessage(AUTH_ERRORS.VALIDATION_NAME_REQUIRED);
  if (name.trim().length < 2)
    return getAuthErrorMessage(AUTH_ERRORS.VALIDATION_NAME_SHORT);
}
// ---------------------------

export function validateRegister(user: RegisterParams): ValidationErrors {
  return {
    email: getEmailError(user.email),
    password: getPasswordError(user.password),
    name: getNameError(user.name),
  };
}

export function validateLogin(user: LoginParams): ValidationErrors {
  return {
    email: getEmailError(user.email),
    password: getPasswordError(user.password),
  };
}

export function validateReAuthenticatedPassword( password: string, ): ValidationErrors {
  return {
    password: getPasswordError(password),
  };
}