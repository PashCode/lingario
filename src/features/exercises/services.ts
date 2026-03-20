import { auth, db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import type {
  InProgressWordsValues,
  NewWordsValues,
} from "@/features/exercises/types";

export async function changeWordScore(
  word: NewWordsValues | InProgressWordsValues,
  changeType: string,
  multiplier: number,
) {
  if (!auth.currentUser) return;

  const docRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "dictionary",
    word.englishWord,
  );

  await updateDoc(docRef, {
    score:
      changeType === "increase"
        ? word.score + (0.2 / multiplier)
        : word.score - (0.2 / multiplier),
  });
}
