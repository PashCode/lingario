import getOrSetSession from "@/utils/storageAndSession/getOrSetSession";
import getOrSetStorage from "@/utils/storageAndSession/getOrSetStorage";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/store";
import { auth } from "@/config/firebase";
import { clearUser, setUser } from "@/features/auth/slice";
import { clearOxford3000, setOxford3000 } from "@/features/dictionaries/slice";
import { LSOxford3000Config } from "@/features/dictionaries/utils/constants";
import { LSPhraseWithDictWordConfig } from"@/features/home/utils/constants";
import { PHRASE_WITH_DICTIONARY_WORD_KEY } from"@/utils/storageAndSession/constants";
import {
  clearPhraseWithDictWord,
  setPhraseWithDictWord,
} from "@/features/home/slice";

// listener that checks and synchronizes user state
const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const isActiveSession = getOrSetSession();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user doesn't exist or logout
      if (!user) {
        dispatch(clearUser());
        dispatch(clearOxford3000());
        dispatch(clearPhraseWithDictWord());
        localStorage.removeItem(PHRASE_WITH_DICTIONARY_WORD_KEY);
        return;
      }

      // needed for registration via firebase.
      // firebase updates name with a 2-3s delay after registration.
      // these lines stop code flow and transfer it to
      // registerUser -> onQueryStarted from authApi.ts
      if (!user.displayName) {
        return;
      }

      // triggers when:
      // 1. the user is logged in
      // 2. some data in Firebase user has been changed
      // 3. logged-in user refreshes the page
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            emailVerified: user.emailVerified,
          }),
        );

        // needed to check the user session.
        // if session is new -> clear and regenerate phrase on homepage
        // via getOrSetStorage(LSPhraseWithDictWordConfig) function below
        if (!isActiveSession) {
          localStorage.removeItem(PHRASE_WITH_DICTIONARY_WORD_KEY);
        }

        // triggers when the user logs in or is already logged in
        getOrSetStorage(LSPhraseWithDictWordConfig).then((phrase) => {
          dispatch(setPhraseWithDictWord(phrase));
        });
        getOrSetStorage(LSOxford3000Config).then((oxford3000) => {
          dispatch(setOxford3000(oxford3000));
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch, isActiveSession]);
};

export default useAuthListener;
