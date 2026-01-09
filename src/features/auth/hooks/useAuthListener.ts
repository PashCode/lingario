import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "@/config/firebase";
import { clearUser, setUser } from "@/features/auth/slice";
import {
  checkGoogleAuthRedirect,
  greetingAfterGoogleRedirect,
} from "@/features/auth/utils/googleRedirect";

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkGoogleAuthRedirect(auth).then((userCredentials) => {
      if (!userCredentials) return;
      greetingAfterGoogleRedirect(userCredentials);
    });
  }, []);

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
