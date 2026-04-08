import { auth } from "@/config/firebase";
import type { User } from "firebase/auth";

export default function requireCurrentUser(): User {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Користувач не авторизований");
  }

  return currentUser;
}
