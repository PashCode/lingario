export const ROUTES = {
  WELCOME: "/",
  HOME: "/home",
  PROFILE: "/profile",
  NOT_FOUND: "*",

  AUTH: {
    ROOT: "/auth",
    RESET_PASSWORD: "/auth/reset-password",
  },

  DICTIONARIES: {
    ROOT: "/dictionary",
    PUBLIC: {
      OXFORD_3000: "/dictionary/public/oxford-3000",
    },
    PERSONAL: {
      OXFORD_WORDS: "/dictionary/personal/oxford",
      CUSTOM_WORDS: "/dictionary/personal/custom",
      ADD_NEW_WORD: "/dictionary/personal/add",
    },
  },

  EXERCISES: {
    ROOT: "/exercises",
    SETTINGS: {
      INTERVAL: '/exercises/settings/interval',
      REPEAT: '/exercises/settings/repeat',
    },
    SESSION: '/exercises/session',
  },
} as const;

