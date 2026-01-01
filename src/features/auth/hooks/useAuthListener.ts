import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "@/config/firebase";
import { logoutUser, setUser } from "@/features/auth/slice.ts";

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("спрацював useAuthListener");
      if (!user) {
        console.log("Юзера немає зовсім, робимо dispatch logoutUser");
        dispatch(logoutUser());
        return;
      }

      if (!user.displayName) {
        console.log("Немає імені юзера, виходимо з useAuthListener");
        return;
      }

      if (user) {
        console.log("Юзер існує, тому робимо діспатч setUser");
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
