export const AUTH_ERRORS = {
  EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
  INVALID_EMAIL: "auth/invalid-email",
  MISSING_PASSWORD: "auth/missing-password",
  WEAK_PASSWORD: "auth/weak-password",
  NO_SPACES_PASSWORD: "auth/no-spaces-password",
  OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",

  USER_NOT_FOUND: "auth/user-not-found",
  USER_MISMATCH: 'auth/user-mismatch',
  WRONG_PASSWORD: "auth/wrong-password",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  REQUIRES_RECENT_LOGIN: "auth/requires-recent-login",
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: "auth/account-exists-with-different-credential",

  TOO_MANY_REQUESTS: "auth/too-many-requests",
  NETWORK_REQUEST_FAILED: "auth/network-request-failed",

  VALIDATION_NAME_REQUIRED: "validation/name-required",
  VALIDATION_NAME_SHORT: "validation/name-too-short",
  VALIDATION_EMAIL_REQUIRED: "validation/email-required",
} as const;

export const DELETE_BATCH_SIZE = 450;