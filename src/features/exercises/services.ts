import { auth, db } from "@/config/firebase";
import { doc } from "firebase/firestore";
import type {
  InProgressWordsValues,
  NewWordsValues,
} from "@/features/exercises/types";
import type { RefObject } from "react";
import { writeBatch } from "firebase/firestore";

export async function saveSessionResultsToDB({
  current: updatedWords,
}: RefObject<Record<string, NewWordsValues | InProgressWordsValues>>) {

  const batch = writeBatch(db);
  if (!auth.currentUser) return;

  for (const word in updatedWords) {
    const docRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "dictionary",
      word,
    );

    batch.update(docRef, {
      score: updatedWords[word].score,
      nextRepeat: updatedWords[word].nextRepeat,
      progress: updatedWords[word].progress
    });
  }

  await batch.commit();
}
