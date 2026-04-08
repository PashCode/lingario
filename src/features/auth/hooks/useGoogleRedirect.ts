import { ensureUserDoc } from "@/features/auth/services";
import { useEffect } from "react";
import {
  getAdditionalUserInfo,
  getRedirectResult,
  type UserCredential,
} from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/config/firebase";
import { isFirebaseError } from "@/features/auth/types";

async function checkRedirectResult(): Promise<UserCredential | null> {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    if (isFirebaseError(error)) {
      console.error(error);
      toast.error("Не вдалося завершити вхід через Google. Спробуйте ще раз.");
    } else {
      console.error(error);
      toast.error("Не вдалося завершити вхід через Google. Спробуйте ще раз.");
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

function useGoogleRedirect() {
  // this hook runs only when the user is redirected back from Google Auth.
  useEffect(() => {
    const processRedirect = async () => {
      // if the user just opened the app normally, this returns null.
      // the credentials return only if we came back from a Google Auth redirect.
      const userCredentials = await checkRedirectResult();
      if (!userCredentials) return;

      try {
        await ensureUserDoc(userCredentials.user.uid);
        greetUser(userCredentials);
      } catch (error) {
        console.error(error);
        toast.error(
          "Вхід виконано, але не вдалося підготувати профіль. Оновіть сторінку або спробуйте пізніше.",
        );
      }
    };

    void processRedirect();
  }, []);
}

export default useGoogleRedirect;
