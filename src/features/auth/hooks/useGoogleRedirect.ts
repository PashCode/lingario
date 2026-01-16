import { useEffect } from "react";
import {
  getAdditionalUserInfo,
  getRedirectResult,
  type UserCredential,
} from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/config/firebase";

async function checkRedirectResult(): Promise<UserCredential | null> {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    toast.error(`Помилка під час входу: ${error}`);
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
  useEffect(() => {
    const processRedirect = async () => {
      const userCredentials = await checkRedirectResult();
      if (!userCredentials) return;

      greetUser(userCredentials);
    };

    void processRedirect();
  }, []);
};
