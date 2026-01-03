import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "@/config/firebase";
import { clearUser, setUser } from "@/features/auth/slice";
import checkRedirectResul from "@/features/auth/utils/authRedirect";

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    void checkRedirectResul(auth);
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
