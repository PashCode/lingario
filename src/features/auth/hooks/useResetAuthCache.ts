import { useEffect } from "react";
import { setGoogleRedirectStatus } from "@/features/auth/slice";
import { useAppDispatch } from "@/app/store";

function useResetAuthCache() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted)
        dispatch(setGoogleRedirectStatus("idle"));
    }

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [dispatch]);
}

export default useResetAuthCache;