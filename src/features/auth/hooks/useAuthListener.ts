import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { clearUser, setUser } from "@/features/auth/slice";
import { clearOxford3000, setOxford3000 } from "@/features/dictionary/slice";
import {
  clearPhraseWithDictWord,
  setPhraseWithDictWord,
} from "@/features/home/slice";
import { useAppDispatch } from "@/app/store";
import getOrSetStorage from "@/utils/storageAndSession/getOrSetStorage";
import { LSOxford3000Config } from "@/features/dictionary/utils/constants";
import { LSPhraseWithDictWordConfig } from "@/features/home/utils/constants";
import getOrSetSession from "@/utils/storageAndSession/getOrSetSession";
import { PHRASE_WITH_DICTIONARY_WORD } from "@/utils/storageAndSession/constants";

const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const isActiveSession = getOrSetSession();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(clearUser());
        dispatch(clearOxford3000());
        dispatch(clearPhraseWithDictWord());
        localStorage.removeItem(PHRASE_WITH_DICTIONARY_WORD);
        return;
      }

      if (!user.displayName) {
        return;
      }

      if (user) {
        dispatch(
          setUser({
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            emailVerified: user.emailVerified,
          }),
        );
        if (!isActiveSession) {
          localStorage.removeItem(PHRASE_WITH_DICTIONARY_WORD);
        }
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
