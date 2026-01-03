import { AUTH_ERRORS } from "./constants";
import type {
  LoginParams,
  RegisterParams,
  ValidationErrors,
} from "@/features/auth/types";
import getAuthErrorMessage from "@/features/auth/utils/errors";

function validateEmail(email: string, errorMessages: ValidationErrors) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-ЯіІїЇєЄґҐ]{2,}$/;

  if (!email.trim())
    return (errorMessages.email = getAuthErrorMessage( AUTH_ERRORS.VALIDATION_EMAIL_REQUIRED ))
  if (!emailRegex.test(email))
    return (errorMessages.email = getAuthErrorMessage( AUTH_ERRORS.INVALID_EMAIL ));

    return null;
}

function validatePassword(password: string, errorMessages: ValidationErrors) {
  if (!password)
    return (errorMessages.password = getAuthErrorMessage( AUTH_ERRORS.MISSING_PASSWORD ));
  if (password.length < 6)
    return (errorMessages.password = getAuthErrorMessage( AUTH_ERRORS.WEAK_PASSWORD ));

    return null;
}

function validateName(name: string, errorMessages: ValidationErrors) {
  if (!name.trim())
    return (errorMessages.name = getAuthErrorMessage( AUTH_ERRORS.VALIDATION_NAME_REQUIRED, ));
  if (name.trim().length < 2)
    return (errorMessages.name = getAuthErrorMessage( AUTH_ERRORS.VALIDATION_NAME_SHORT ));

    return null;
}

export function validateRegister(user: RegisterParams) {
  const errorMessages: ValidationErrors = {};
  validateEmail(user.email, errorMessages);
  validatePassword(user.password, errorMessages);
  validateName(user.name, errorMessages);
  return errorMessages;
}

export function validateLogin(user: LoginParams) {
  const errorMessages: ValidationErrors = {};
  validateEmail(user.email, errorMessages);
  validatePassword(user.password, errorMessages);
  return errorMessages;
}
