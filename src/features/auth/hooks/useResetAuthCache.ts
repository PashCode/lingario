import { useEffect } from "react";
import { setGoogleRedirectStatus } from "@/features/auth/slice";
import { useAppDispatch } from "@/app/store";

function useResetAuthCache() {
  const dispatch = useAppDispatch();

  // if the user clicks "Login with Google" and then immediately navigates back,
  // the button is still stuck in "loading" state.
  // this listener fixes it and sets "idle" state.
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // event.persisted === true if the page was restored from the cache.
      // event.persisted === true if the user navigates back.
      if (event.persisted) dispatch(setGoogleRedirectStatus("idle"));
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [dispatch]);
}

export default useResetAuthCache;