import { toast } from "sonner";
import { loginWithGoogle } from "@/features/auth/services";
import {
  selectGoogleRedirectStatus,
  setGoogleRedirectStatus,
  setOxfordDictionary,
} from "@/features/auth/slice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { isFirebaseApiError } from "@/features/auth/types";
import getOrCreateOxfordDictionary from "@/features/auth/utils/ensureDictionary";

function useGoogleAuth() {
  const dispatch = useAppDispatch();
  const redirectLoadingStatus = useAppSelector(selectGoogleRedirectStatus);

  async function handleLoginWithGoogle() {
    try {
      dispatch(setGoogleRedirectStatus("loading"));
      const oxfordDictionary = await getOrCreateOxfordDictionary();
      dispatch(setOxfordDictionary(oxfordDictionary));
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
