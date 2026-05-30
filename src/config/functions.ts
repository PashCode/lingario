import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { firebaseConfig } from "@/config/firebase";

export const functions = getFunctions(firebaseConfig, "europe-central2");

if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
