import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
  sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential,
} from "firebase/auth";
import auth from "@/config/firebase";
import type { LoginParams, RegisterParams } from "@/features/auth/types";

export async function register({ email, name, password }: RegisterParams) {
    const { user } = await createUserWithEmailAndPassword( auth, email, password, );
    await updateProfile(user, { displayName: name });
    await sendEmailVerification(user);
    return user;
}

export async function login({ email, password }: LoginParams) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
}

export async function logout() {
    await signOut(auth);
}

export async function loginWithGoogle() {
    await signInWithRedirect(auth, new GoogleAuthProvider());
}

export async function deleteAccount() {
  const user = auth.currentUser;
  if (!user) return;

  await deleteUser(user);
}

export async function reauthenticateDeleteAccount(password: string) {
  if (!auth.currentUser?.email) return;

  const credentials = EmailAuthProvider.credential( auth.currentUser.email, password );
  await reauthenticateWithCredential(auth.currentUser, credentials);
}
