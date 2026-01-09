import {
  getRedirectResult,
  type Auth,
  type UserCredential,
  getAdditionalUserInfo,
} from "firebase/auth";
import { toast } from "sonner";

export async function checkGoogleAuthRedirect(
  auth: Auth,
): Promise<UserCredential | null | undefined> {
  try {
    const userCredentials = await getRedirectResult(auth);
    if (!userCredentials) return null;
    return userCredentials;
  } catch (error) {
    toast.error(`Сталася непередбачувана помилка ${error}`);
  }
}

export function greetingAfterGoogleRedirect(userCredentials: UserCredential) {
  const userInfo = getAdditionalUserInfo(userCredentials);

  return userInfo?.isNewUser
    ? toast.success("Ви успішно зареєструвались")
    : toast.success("З поверненням");
}
