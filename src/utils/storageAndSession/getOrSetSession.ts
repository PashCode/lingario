import { SESSION_KEY } from "@/utils/storageAndSession/constants";

function getOrSetSession() {
  const isSessionActive = sessionStorage.getItem(SESSION_KEY);

  if (isSessionActive) {
    return isSessionActive;
  }

  sessionStorage.setItem(SESSION_KEY, "true");
  return isSessionActive;
}

export default getOrSetSession;
