import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
  // sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import { auth, oxfordDictionaryStorage } from "@/config/firebase";
import type { LoginParams, RegisterParams } from "@/features/auth/types";
import { getDownloadURL } from "firebase/storage";

export async function register({ email, name, password }: RegisterParams) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  // await sendEmailVerification(user);
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
  if (!auth.currentUser) return;
  await deleteUser(auth.currentUser);
}

export async function reauthDeleteWithPassword(password: string) {
  if (!auth.currentUser?.email) return;

  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email,
    password,
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
}

export async function reauthDeleteWithGoogle() {
  if (!auth.currentUser) return;
  return await reauthenticateWithPopup(
    auth.currentUser,
    new GoogleAuthProvider(),
  );
}

export async function getOxfordDictionaryFromDB() {
  const oxfordDictionaryLink = await getDownloadURL(oxfordDictionaryStorage);
  const oxfordDictionary = await fetch(oxfordDictionaryLink);
  return await oxfordDictionary.json();
}
