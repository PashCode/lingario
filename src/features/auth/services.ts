import {
  OXFORD_3000_KEY,
  HOMEPAGE_AI_SENTENCE_KEY,
} from "@/shared/utils/storageAndSession/constants";
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
  signInAnonymously,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import type { LoginParams, RegisterParams } from "@/features/auth/types";
import { getDoc, setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function register({ email, name, password }: RegisterParams) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  // updateProfile is required because "createUserWithEmailAndPassword" doesn't support name.
  await updateProfile(user, { displayName: name });
  const isDBUserExist = await checkDBUserExist(user.uid);
  if (!isDBUserExist) await addNewUserToDB(user.uid);
  // await sendEmailVerification(user);
  return user;
}

export async function login({ email, password }: LoginParams) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const isDBUserExist = await checkDBUserExist(user.uid);
  if (!isDBUserExist) await addNewUserToDB(user.uid);
}

export async function loginAnonymously() {
  const { user } = await signInAnonymously(auth);
  return user;
}

// checkDBUserExist is executed in useGoogleRedirect hook.
export async function loginWithGoogle() {
  await signInWithRedirect(auth, new GoogleAuthProvider());
}

export async function logout() {
  await signOut(auth);
}

export async function deleteAccount() {
  if (!auth.currentUser) return;

  await deleteDBUser(auth.currentUser.uid);
  await deleteUser(auth.currentUser);
  localStorage.removeItem(OXFORD_3000_KEY);
  localStorage.removeItem(HOMEPAGE_AI_SENTENCE_KEY);
}

// firebase requires fresh credentials if the login session is too old.
export async function reauthDeleteWithPassword(password: string) {
  if (!auth.currentUser?.email) return;
  await reauthenticateWithCredential(
    auth.currentUser,
    EmailAuthProvider.credential(auth.currentUser.email, password),
  );
}

// firebase requires fresh credentials if the login session is too old.
export async function reauthDeleteWithGoogle() {
  if (!auth.currentUser) return;
  await reauthenticateWithPopup(auth.currentUser, new GoogleAuthProvider());
}

export async function addNewUserToDB(uid: string) {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { userID: uid }, { merge: true });
  return docRef;
}

export async function checkDBUserExist(uid: string) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

async function deleteDBUser(uid: string) {
  const docRef = doc(db, "users", uid);
  await deleteDoc(docRef);
}
