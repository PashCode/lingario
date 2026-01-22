import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { clearUser, setUser } from "@/features/auth/slice";
import { clearOxford3000 } from "@/features/dictionary/slice";
import { clearAIEverydayPhrase } from "@/features/home/slice";
import { setOxford3000 } from "@/features/dictionary/slice";
import { useAppDispatch } from "@/app/store";
import getStorageOrFetch from "@/utils/getStorageOrFetch";
import { LSOxford3000Config } from "@/features/dictionary/utils/constants";
import { setAIEverydayPhrase } from "@/features/home/slice";
import { LSAIEverydayPhraseConfig } from "@/features/home/utils/constants";

const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(clearUser());
        dispatch(clearOxford3000());
        dispatch(clearAIEverydayPhrase());
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
        getStorageOrFetch(LSAIEverydayPhraseConfig).then((AIEverydayPhrase) => {
          dispatch(setAIEverydayPhrase(AIEverydayPhrase));
        });
        getStorageOrFetch(LSOxford3000Config).then((oxfordDictionary) => {
          dispatch(setOxford3000(oxfordDictionary));
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;
