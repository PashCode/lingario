export const AUTH_ERRORS = {
  EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
  INVALID_EMAIL: "auth/invalid-email",
  MISSING_PASSWORD: "auth/missing-password",
  WEAK_PASSWORD: "auth/weak-password",
  OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",

  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
  INVALID_CREDENTIAL: "auth/invalid-credential",

  TOO_MANY_REQUESTS: "auth/too-many-requests",
  NETWORK_REQUEST_FAILED: "auth/network-request-failed",

  VALIDATION_NAME_REQUIRED: "validation/name-required",
  VALIDATION_NAME_SHORT: "validation/name-too-short",
  VALIDATION_EMAIL_REQUIRED: "validation/email-required",
} as const;
