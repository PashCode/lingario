import { toast } from "sonner";
import { loginWithGoogle } from "@/features/auth/services";
import {
  selectGoogleRedirectStatus,
  setGoogleRedirectStatus,
} from "@/features/auth/slice";
import { setOxford3000 } from "@/features/dictionary/slice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { isFirebaseApiError } from "@/features/auth/types";
import getStorageOrFetch from "@/utils/getStorageOrFetch";
import { LSOxford3000Config } from "@/features/dictionary/utils/constants";

function useGoogleAuth() {
  const dispatch = useAppDispatch();
  const redirectLoadingStatus = useAppSelector(selectGoogleRedirectStatus);

  async function handleLoginWithGoogle() {
    try {
      dispatch(setGoogleRedirectStatus("loading"));
      const oxfordDictionary = await getStorageOrFetch(LSOxford3000Config);
      dispatch(setOxford3000(oxfordDictionary));
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
