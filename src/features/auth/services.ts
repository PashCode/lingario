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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { DELETE_BATCH_SIZE } from "@/features/auth/utils/constants";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";

export async function register({ email, name, password }: RegisterParams) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  // updateProfile is required because "createUserWithEmailAndPassword" doesn't support name field.
  await updateProfile(user, { displayName: name });
  await ensureUserDoc(user.uid);
  // await sendEmailVerification(user);
  return user;
}

export async function login({ email, password }: LoginParams) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(user.uid);
}

export async function loginAnonymously() {
  const { user } = await signInAnonymously(auth);
  await ensureUserDoc(user.uid);
  return user;
}

export async function loginWithGoogle() {
  await signInWithRedirect(auth, new GoogleAuthProvider());
}

export async function logout() {
  await signOut(auth);
}

// firebase requires fresh credentials if the login session is too old.
export async function reauthDeleteWithPassword(password: string) {
  const currentUser = requireCurrentUser();

  if (!currentUser.email) {
    throw new Error("У користувача відсутній email для повторної авторизації");
  }

  await reauthenticateWithCredential(
    currentUser,
    EmailAuthProvider.credential(currentUser.email, password),
  );
}

// firebase requires fresh credentials if the login session is too old.
export async function reauthDeleteWithGoogle() {
  const currentUser = requireCurrentUser();
  await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
}

// this creates user doc if it is missing and keeps old fields if doc already exists.
export async function ensureUserDoc(uid: string) {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { userID: uid }, { merge: true });
  return docRef;
}

async function deleteUserDictionary(uid: string) {
  const dictionaryRef = collection(db, "users", uid, "dictionary");
  const dictionarySnapshot = await getDocs(dictionaryRef);
  const dictionaryDocs = dictionarySnapshot.docs;

  for (let i = 0; i < dictionaryDocs.length; i += DELETE_BATCH_SIZE) {
    // firestore batch writes are limited (500), so we delete the dictionary in chunks.
    const batch = writeBatch(db);
    const chunk = dictionaryDocs.slice(i, i + DELETE_BATCH_SIZE);

    chunk.forEach((wordDoc) => {
      batch.delete(wordDoc.ref);
    });

    await batch.commit();
  }
}

export async function deleteAccount() {
  const currentUser = requireCurrentUser();

  // delete firestore data first, then delete auth user.
  await deleteUserDictionary(currentUser.uid);
  await deleteDoc(doc(db, "users", currentUser.uid));
  await deleteUser(currentUser);
  localStorage.removeItem(OXFORD_3000_KEY);
  localStorage.removeItem(HOMEPAGE_AI_SENTENCE_KEY);
}
