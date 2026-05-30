import { AUTH_ERRORS } from "./constants";

const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Email
    case AUTH_ERRORS.EMAIL_ALREADY_IN_USE:
      return "Ця пошта вже зареєстрована. Спробуй увійти";
    case AUTH_ERRORS.INVALID_EMAIL:
      return "Некоректний формат пошти";

    // Password
    case AUTH_ERRORS.MISSING_PASSWORD:
      return "Введи пароль";
    case AUTH_ERRORS.NO_SPACES_PASSWORD:
      return "Пароль не повинен містити пробіли"
    case AUTH_ERRORS.WEAK_PASSWORD:
      return "Не менше 6 символів";

    // Login
    case AUTH_ERRORS.USER_NOT_FOUND:
    case AUTH_ERRORS.WRONG_PASSWORD:
    case AUTH_ERRORS.INVALID_CREDENTIAL:
    case AUTH_ERRORS.OPERATION_NOT_ALLOWED:
      return "Невірний email або пароль";

    // Login via Google Sign in or other providers
    case AUTH_ERRORS.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
      return "Акаунт з такою поштою вже існує";
    case AUTH_ERRORS.USER_MISMATCH:
      return "Використай правильний акаунт";

    // Account deletion
    case AUTH_ERRORS.REQUIRES_RECENT_LOGIN:
      return "Щоб видалити акаунт, потрібно підтвердити особу. Увійди знову";

    // Validation
    case AUTH_ERRORS.VALIDATION_NAME_REQUIRED:
      return "Введи ім'я";
    case AUTH_ERRORS.VALIDATION_NAME_SHORT:
      return "Мінімум 2 символи";
    case AUTH_ERRORS.VALIDATION_EMAIL_REQUIRED:
      return "Введи email";

    // Network
    case AUTH_ERRORS.TOO_MANY_REQUESTS:
      return "Забагато спроб. Спробуй пізніше";
    case AUTH_ERRORS.NETWORK_REQUEST_FAILED:
      return "Помилка мережі. Перевір інтернет";

    default:
      return "Сталася непередбачувана помилка. Спробуй пізніше";
  }
};

export default getAuthErrorMessage;
