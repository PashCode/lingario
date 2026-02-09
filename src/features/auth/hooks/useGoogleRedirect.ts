import { addNewUserToDB, checkDBUserExist } from "@/features/auth/services";
import { useEffect } from "react";
import {
  getAdditionalUserInfo,
  getRedirectResult,
  type UserCredential,
} from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/config/firebase";
import { isFirebaseApiError } from "@/features/auth/types";

async function checkRedirectResult(): Promise<UserCredential | null> {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    if (isFirebaseApiError(error)) {
      toast.error(error.message);
    }
    return null;
  }
}

function greetUser(userCredentials: UserCredential) {
  const userInfo = getAdditionalUserInfo(userCredentials);

  return userInfo?.isNewUser
    ? toast.success("Ви успішно зареєструвались")
    : toast.success("З поверненням");
}

export const useGoogleRedirect = () => {
  // this hook runs only when the user is redirected back from Google Auth.
  useEffect(() => {
    const processRedirect = async () => {
      // if the user just opened the app normally, this returns null.
      // the credentials return only if we came back from a Google Auth redirect.
      const userCredentials = await checkRedirectResult();
      if (!userCredentials) return;

      const isDBUserExist = await checkDBUserExist(userCredentials.user.uid);
      if (!isDBUserExist) await addNewUserToDB(userCredentials.user.uid);

      greetUser(userCredentials);
    };

    void processRedirect();
  }, []);
};
