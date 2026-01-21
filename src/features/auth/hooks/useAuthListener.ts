import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { clearUser, setUser } from "@/features/auth/slice";
import { setOxfordDictionary } from "@/features/dictionary/slice";
import { useAppDispatch } from "@/app/store";
import getOrCreateOxfordDictionary from "@/features/auth/utils/ensureDictionary";

const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(clearUser());
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
        getOrCreateOxfordDictionary().then((dictionary) => {
          dispatch(setOxfordDictionary(dictionary));
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;
