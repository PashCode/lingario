import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { clearUser, setUser } from "@/features/auth/slice";
import { useAppDispatch } from "@/app/store";

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
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;
