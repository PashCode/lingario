import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "@/config/firebase";
import { logoutUser, setUser } from "@/features/auth/slice.ts";
import checkRedirectResul from "@/features/auth/utils/AuthRedirect.ts";

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    void checkRedirectResul(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(logoutUser());
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
