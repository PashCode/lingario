import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../../config/firebase.ts";

export async function register(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(auth) {
  await signOut(auth);
}
