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
      OXFORD_WORDS: "/dictionaries/personal/oxford",
      CUSTOM_WORDS: "/dictionaries/personal/custom",
      ADD_NEW_WORD: "/dictionaries/personal/add",
    },
  },

  EXERCISES: {
    ROOT: "/exercises",
    SESSION: "/exercises/session",
    SETTINGS: {
      MAIN: "/exercises/settings/main",
      REPEAT: "/exercises/settings/repeat",
    },
  },
};
