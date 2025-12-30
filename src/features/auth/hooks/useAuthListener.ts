import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "@/config/firebase";
import { logoutUser, registerUser } from "@/features/auth/slice.ts";

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          registerUser({
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            emailVerified: user.emailVerified,
          }),
        );
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;
