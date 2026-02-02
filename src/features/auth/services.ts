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
import { auth } from "@/config/firebase";
import type { LoginParams, RegisterParams } from "@/features/auth/types";
// import { addDoc, collection } from "firebase/firestore";
// import {db} from "@/config/firebase"

export async function register({ email, name, password }: RegisterParams) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  // updateProfile is required because "createUserWithEmailAndPassword" doesn't support name.
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

// firebase requires fresh credentials if the login session is too old.
export async function reauthDeleteWithPassword(password: string) {
  if (!auth.currentUser?.email) return;

  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email,
    password,
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
}

// firebase requires fresh credentials if the login session is too old.
export async function reauthDeleteWithGoogle() {
  if (!auth.currentUser) return;

  return await reauthenticateWithPopup(
    auth.currentUser,
    new GoogleAuthProvider(),
  );
}

// export async function addNewUserToDB(uid: any) {
//   const docRef = await addDoc(collection(db, "users"), { userID: uid });
//   return docRef
// }
