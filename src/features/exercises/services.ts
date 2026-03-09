import { auth, db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function changeWordScore(word: any, changeType: string) {
  if (!auth.currentUser) return;

  const docRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "dictionary",
    word.englishWord,
  );

  await updateDoc(docRef, {
    score: changeType === "increase" ? word.score + 0.2 : word.score - 0.2,
  });
}
