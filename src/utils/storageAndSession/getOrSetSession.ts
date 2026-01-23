function getOrSetSession() {
  const isSessionActive = sessionStorage.getItem("is-active-session");

  if (isSessionActive) {
    return isSessionActive;
  }

  sessionStorage.setItem("is-active-session", "true");
  return isSessionActive;
}

export default getOrSetSession;
