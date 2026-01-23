import { toast } from "sonner";
import { loginWithGoogle } from "@/features/auth/services";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { isFirebaseApiError } from "@/features/auth/types";
import {
  selectGoogleRedirectStatus,
  setGoogleRedirectStatus,
} from "@/features/auth/slice";

function useGoogleAuth() {
  const dispatch = useAppDispatch();
  const redirectLoadingStatus = useAppSelector(selectGoogleRedirectStatus);

  async function handleLoginWithGoogle() {
    try {
      dispatch(setGoogleRedirectStatus("loading"));
      await loginWithGoogle();
    } catch (error) {
      if (isFirebaseApiError(error)) {
        toast.error(error.message);
        dispatch(setGoogleRedirectStatus("idle"));
      }
    }
  }

  return { redirectLoadingStatus, handleLoginWithGoogle };
}

export default useGoogleAuth;
