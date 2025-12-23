import { AUTH_ERRORS } from "./authConstants";
import type {
  UserRegisterData,
  ValidationErrors,
} from "@/features/auth/authTypes";

export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Реєстрація
    case AUTH_ERRORS.EMAIL_ALREADY_IN_USE:
      return "Ця пошта вже зареєстрована. Спробуйте увійти.";
    case AUTH_ERRORS.INVALID_EMAIL:
      return "Некоректний формат електронної пошти.";
    case AUTH_ERRORS.MISSING_PASSWORD:
      return "Будь ласка, введіть пароль.";
    case AUTH_ERRORS.WEAK_PASSWORD:
      return "Пароль повинен містити не менше 6 символів.";
    case AUTH_ERRORS.OPERATION_NOT_ALLOWED:
      return "Вхід через пошту/пароль не увімкнено в налаштуваннях.";

    // Вхід
    case AUTH_ERRORS.USER_NOT_FOUND:
    case AUTH_ERRORS.WRONG_PASSWORD:
    case AUTH_ERRORS.INVALID_CREDENTIAL:
      return "Невірний email або пароль.";

    // Загальні
    case AUTH_ERRORS.TOO_MANY_REQUESTS:
      return "Доступ тимчасово заблоковано через часті спроби. Спробуйте пізніше.";
    case AUTH_ERRORS.NETWORK_REQUEST_FAILED:
      return "Помилка мережі. Перевірте підключення до інтернету.";

    // Локальні
    case AUTH_ERRORS.VALIDATION_NAME_REQUIRED:
      return "Будь ласка, введіть ім'я.";
    case AUTH_ERRORS.VALIDATION_NAME_SHORT:
      return "Ім'я занадто коротке (мінімум 2 символи).";
    case AUTH_ERRORS.VALIDATION_PASS_REQUIRED:
      return "Введіть пароль.";
      case AUTH_ERRORS.VALIDATION_EMAIL_FORMAT:
        return "Введіть коректний email (наприклад user@gmail.com)";

    default:
      return `Сталася помилка. Спробуйте ще раз. (Код: ${errorCode})`;
  }
};

export function validateRegisterForm(user: UserRegisterData): ValidationErrors {
  const errorMessages: ValidationErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!user.email.trim()) {
    errorMessages.email = getAuthErrorMessage(AUTH_ERRORS.INVALID_EMAIL);
  } else if (!emailRegex.test(user.email)) {
    errorMessages.email = getAuthErrorMessage(AUTH_ERRORS.VALIDATION_EMAIL_FORMAT);
  }

  if (!user.password) {
    errorMessages.password = getAuthErrorMessage(AUTH_ERRORS.MISSING_PASSWORD);
  } else if (user.password.length < 6) {
    errorMessages.password = getAuthErrorMessage(AUTH_ERRORS.WEAK_PASSWORD);
  }

  if (!user.name.trim()) {
    errorMessages.name = getAuthErrorMessage(AUTH_ERRORS.VALIDATION_NAME_REQUIRED);
  } else if (user.name.length < 2) {
    errorMessages.name = getAuthErrorMessage(AUTH_ERRORS.VALIDATION_NAME_SHORT);
  }

  return errorMessages;
}
