import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  // sendEmailVerification,
} from "firebase/auth";
import auth from "@/config/firebase";
import type { RegisterParams } from "@/features/auth/types.ts";

export async function register({ email, name, password }: RegisterParams) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  // await sendEmailVerification(user);
  return user;
}

export async function login(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  await signOut(auth);
}
