import { AUTH_ERRORS } from "./constants.ts";

const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Пошта
    case AUTH_ERRORS.EMAIL_ALREADY_IN_USE:
      return "Ця пошта вже зареєстрована. Спробуйте увійти.";
    case AUTH_ERRORS.INVALID_EMAIL:
      return "Некоректний формат електронної пошти (наприклад user@gmail.com).";

    // Пароль
    case AUTH_ERRORS.MISSING_PASSWORD:
      return "Будь ласка, введіть пароль.";
    case AUTH_ERRORS.WEAK_PASSWORD:
      return "Пароль повинен містити не менше 6 символів.";

    // Вхід
    case AUTH_ERRORS.USER_NOT_FOUND:
    case AUTH_ERRORS.WRONG_PASSWORD:
    case AUTH_ERRORS.INVALID_CREDENTIAL:
    case AUTH_ERRORS.OPERATION_NOT_ALLOWED:
      return "Невірний email або пароль.";

    // Валідація
    case AUTH_ERRORS.VALIDATION_NAME_REQUIRED:
      return "Будь ласка, введіть ім'я.";
    case AUTH_ERRORS.VALIDATION_NAME_SHORT:
      return "Ім'я має бути мінімум 2 символи.";
    case AUTH_ERRORS.VALIDATION_EMAIL_REQUIRED:
      return "Будь ласка, введіть email.";

    // Мережа
    case AUTH_ERRORS.TOO_MANY_REQUESTS:
      return "Забагато спроб. Спробуйте пізніше.";
    case AUTH_ERRORS.NETWORK_REQUEST_FAILED:
      return "Помилка мережі. Перевірте інтернет.";

    default:
      return "Сталася помилка. Спробуйте ще раз.";
  }
};

export default getAuthErrorMessage;