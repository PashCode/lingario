export const ROUTES = {
  HOME: "/",
  WELCOME: "/welcome",
  PROFILE: "/profile",
  NOT_FOUND: "*",

  AUTH: {
    ROOT: "/auth",
    RESET_PASSWORD: "/auth/reset-password",
  },

  DICTIONARIES: {
    ROOT: "/dictionaries",
    PUBLIC: {
      OXFORD_3000: "/dictionaries/public/oxford-3000",
    },
    PERSONAL: {
      ROOT: "/dictionaries/personal",
    },
  },

  EXERCISES: {
    ROOT: "/exercises",
    SETTINGS: "/exercises/settings",
    SESSION: "/exercises/session",
    SESSION_RESULT: "/exercises/session-result",
  },
};
